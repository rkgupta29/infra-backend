import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { FileUploadService } from '../../common/file-upload/file-upload.service';
import type { Multer } from 'multer';

// Note: This is a temporary workaround until the Prisma client is regenerated
interface ExtendedPrismaService extends PrismaService {
  conversation: any;
}

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  /**
   * Create a new conversation
   * @param createConversationDto - Data for the new conversation
   * @param imageFile - Uploaded image file
   * @returns The created conversation
   */
  async create(
    createConversationDto: CreateConversationDto,
    imageFile?: Multer.File,
  ) {
    try {
      let imageUrl = '';

      // Handle image upload if provided
      if (imageFile) {
        // Generate unique filename with timestamp and hash
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = createConversationDto.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30); // Shorter name to accommodate hash
        
        // Upload image with unique filename
        imageUrl = await this.fileUploadService.uploadImage(
          imageFile, 
          `conversation-${sanitizedName}-${timestamp}-${randomHash}`
        );
      } else {
        throw new BadRequestException('Image file is required');
      }

      // Create conversation with file URL
      const conversation = await (this.prisma as ExtendedPrismaService).conversation.create({
        data: {
          image: imageUrl,
          name: createConversationDto.name,
          title: createConversationDto.title,
          desc: createConversationDto.desc,
          videoLink: createConversationDto.videoLink,
          date: createConversationDto.date,
          active: createConversationDto.active !== undefined ? createConversationDto.active : true,
        },
      });
      
      this.logger.log(`Created new conversation: ${createConversationDto.name}`);
      return conversation;
    } catch (error) {
      this.logger.error(`Failed to create conversation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get all conversations with pagination
   * @param page - Page number
   * @param limit - Items per page
   * @param activeOnly - If true, returns only active conversations
   * @returns Paginated conversations
   */
  async findAll(page = 1, limit = 10, activeOnly = false) {
    try {
      const skip = (page - 1) * limit;
      
      const where = activeOnly ? { active: true } : {};

      const [conversations, total] = await Promise.all([
        (this.prisma as ExtendedPrismaService).conversation.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
        }),
        (this.prisma as ExtendedPrismaService).conversation.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: conversations,
        meta: {
          total,
          page,
          limit,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      this.logger.error(`Failed to fetch conversations: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get a specific conversation by ID
   * @param id - Conversation ID
   * @returns The conversation
   */
  async findOne(id: string) {
    const conversation = await (this.prisma as ExtendedPrismaService).conversation.findUnique({
      where: { id },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }

    return conversation;
  }

  /**
   * Update a conversation
   * @param id - Conversation ID
   * @param updateConversationDto - Updated data
   * @param imageFile - Optional new image file
   * @returns The updated conversation
   */
  async update(
    id: string, 
    updateConversationDto: UpdateConversationDto,
    imageFile?: Multer.File,
  ) {
    // Check if conversation exists
    const existingConversation = await this.findOne(id);

    try {
      const updateData: any = { ...updateConversationDto };

      // Handle image upload if provided
      if (imageFile) {
        // Generate unique filename with timestamp and hash
        const timestamp = Date.now();
        const randomHash = Math.random().toString(36).substring(2, 10);
        const sanitizedName = updateConversationDto.name || existingConversation.name;
        const formattedName = sanitizedName
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
          .substring(0, 30); // Shorter name to accommodate hash
        
        // Upload new image with unique filename
        const imageUrl = await this.fileUploadService.uploadImage(
          imageFile, 
          `conversation-${formattedName}-${timestamp}-${randomHash}`
        );
        
        // Add image URL to update data
        updateData.image = imageUrl;
        
        // Delete old image if it exists and is in our assets
        if (existingConversation.image && existingConversation.image.startsWith('/assets/')) {
          await this.fileUploadService.deleteFile(
            existingConversation.image.replace('/assets/', '')
          );
        }
      }

      // Update conversation
      const updatedConversation = await (this.prisma as ExtendedPrismaService).conversation.update({
        where: { id },
        data: updateData,
      });
      
      this.logger.log(`Updated conversation: ${id}`);
      return updatedConversation;
    } catch (error) {
      this.logger.error(`Failed to update conversation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Toggle conversation active status
   * @param id - Conversation ID
   * @returns The updated conversation
   */
  async toggleStatus(id: string) {
    // Check if conversation exists
    const conversation = await this.findOne(id);
    
    // Toggle active status
    return (this.prisma as ExtendedPrismaService).conversation.update({
      where: { id },
      data: { active: !conversation.active },
    });
  }

  /**
   * Delete a conversation
   * @param id - Conversation ID
   * @returns Deletion confirmation
   */
  async remove(id: string) {
    // Check if conversation exists
    const conversation = await this.findOne(id);
    
    try {
      // Delete the conversation
      await (this.prisma as ExtendedPrismaService).conversation.delete({
        where: { id },
      });
      
      // Delete image if it exists and is in our assets
      if (conversation.image && conversation.image.startsWith('/assets/')) {
        await this.fileUploadService.deleteFile(
          conversation.image.replace('/assets/', '')
        );
      }
      
      this.logger.log(`Deleted conversation: ${id}`);
      return { success: true, message: 'Conversation deleted successfully' };
    } catch (error) {
      this.logger.error(`Failed to delete conversation: ${error.message}`);
      throw error;
    }
  }

  /**
   * Legacy method to get static conversation data
   * @returns Static conversation data
   */
  async getConversation() {
    // Try to get from database first
    try {
      const result = await this.findAll(1, 100, true);
      
      // If we have data in the database, return it
      if (result.data.length > 0) {
        return {
          conversation: result.data,
          totalCount: result.meta.total,
          lastUpdated: new Date().toISOString()
        };
      }
    } catch (error) {
      this.logger.warn('Failed to get conversations from database, falling back to static data');
    }
    
    // Fallback to static data
    const conversation: any[] = [
      {
        image: "/assets/knowledeg/conversations/08.png",
        videoLink:
          "https://www.youtube.com/watch?v=w6oJTRqeB4A&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=9&ab_channel=TheInfravisionFoundation",
        name: "Pratap Padode",
        title:
          "Founder and President, First Construction Council, and author, Tarmac to Towers: India's Infrastructure Story",
        desc: "Infra projects in India are invariably only 90 percent complete",
        date: "June 10, 2025",
      },
      {
        image: "/assets/knowledeg/conversations/02.png",
        videoLink:
          "https://www.youtube.com/watch?v=g5aA3Q3af1g&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=8&ab_channel=TheInfravisionFoundation",
        name: "Jagan Shah",
        title:
          "The Infravision Foundation CEO and senior expert in urban development policy",
        desc: "Why India needs a national plan to build new cities",
        date: "June 5, 2025",
      },
      {
        image: "/assets/knowledeg/conversations/01.jpg",
        videoLink:
          "https://www.youtube.com/embed/Sr17ZN7FLA4?si=DFB5whTWLmjG50EK",
        name: "Professor Geetam Tiwari",
        title:
          "TRIPP Chair Professor at the Department of Civil Engineering, Indian Institute of Technology in New Delhi, India.",
        desc: "Selecting the appropriate urban transport system for India's cities",
        date: "May 30, 2024",
      },
      {
        image: "/assets/knowledeg/conversations/07.png",
        videoLink:
          "https://www.youtube.com/watch?v=Jis2Q7oOfr0&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=6&ab_channel=TheInfravisionFoundation",
        name: "Rajaji Meshram",
        title: "Transport and Logistic Experts",
        desc: "Sustainability Ratings : an idea whose time has come",
        date: "September 15, 2023",
      },
      {
        image: "/assets/knowledeg/conversations/05.jpg",
        videoLink:
          "https://www.youtube.com/watch?v=H34LNACsKZw&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=5&ab_channel=TheInfravisionFoundation",
        name: "Prof Sandip Chakrabarti",
        title: "Faculty Member, Public Systems Group, IIMA",
        desc: "Making metro systems financially viable, what needs to be done?",
        date: "October 11, 2023",
      },
      {
        image: "/assets/knowledeg/conversations/04.jpg",
        videoLink:
          "https://www.youtube.com/watch?v=ZdLcdjJShW8&t=14s&ab_channel=TheInfravisionFoundation",
        name: "Rajiv Ranjan Mishra",
        title:
          "Distinguished Fellow, The Infravision Foundation, and former Director General, National Mission for Clean Ganga     ",
        desc: "Selecting the appropriate urban transport system for India's cities",
        date: "October 11, 2023",
      },
      {
        image: "/assets/knowledeg/conversations/06.jpg",
        videoLink:
          "https://www.youtube.com/watch?v=5A-JtJ-jDzw&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=3&ab_channel=TheInfravisionFoundation",
        name: "Prof Gopal Naik",
        title: "Economics and Social Science, IIM Bangalore",
        desc: "How to improve warehousing in India and enhance credit availability",
        date: "December 14, 2023",
      },
      {
        image: "/assets/knowledeg/conversations/09.png",
        videoLink:
          "https://www.youtube.com/watch?v=OjrOlknqzu4&ab_channel=TheInfravisionFoundation",
        name: "Jagan Shah",
        title:
          "The Infravision Foundation CEO and senior expert in urban development policy, Jagan Shah",
        desc: "Air pollution: The solution has to be multi-sectoral",
        date: "November 14, 2023",
      },
      {
        image: "/assets/knowledeg/conversations/03.jpg",
        videoLink:
          "https://www.youtube.com/watch?v=uzP6Vc_7IrQ&ab_channel=TheInfravisionFoundation",
        name: "Prof. G Raghuram",
        title:
          "Member, Council of Advisors, TIF, and Former Director, IIM Bangalore",
        desc: "Indian Railways : Why innovation matters",
        date: "November 6,2023",
      },
    ];
    
    return {
      conversation,
      totalCount: conversation.length,
      lastUpdated: new Date().toISOString()
    };
  }
}