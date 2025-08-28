import { Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResult } from '../types/utils';

@Injectable()
export class NewsletterService {
  // Store all newsletter articles
  private readonly newsletters = [
        {
          id: 27,
          img: "/assets/archive/newsletter/agustNewsletter.png",
          category: "Volume 27",
          title: "",
          sectors: "",
          date: "August 2025",
          description:
            "TIF reaches out to stakeholders",
          link: "/assets/pdf/augustNewsletter.pdf",
        },
        {
          id: 25,
          img: "/assets/archive/newsletter/latest1.png",
          category: "Volume 26",
          title: " ",
          sectors: "",
          date: "July 2025",
          description:
            "Do you want to be an Infrapandit?",
          link: "/assets/pdf/july.pdf",
        },
         {
          id: 26,
          img: "/assets/archive/newsletter/latest2.png",
          category: "Volume 25",
          title: " ",
          sectors: "",
          date: "June 2025",
          description:
            "Transforming Cities into Frontiers for Economic Growth ",
          link: "/assets/pdf/june2025.pdf",
        },
      
        {
          id: 1,
          img: "/assets/archive/newsletter/newsletter1.png",
          category: "Volume 24",
          title: "",
          sectors: "",
          date: "May 2025",
          description:
            "Making change happen",
          link: "/assets/pdf/letter1.pdf",
        },
         {
          id: 2,
          img: "/assets/archive/newsletter/newsletter2.png",
          category: "Volume 23",
          title: " ",
          sectors: "",
          date: "April 2025",
          description:
            "Decarbonising urban transport",
          link: "/assets/pdf/letter2.pdf",
        },
         {
          id: 3,
          img: "/assets/archive/newsletter/newsletter3.png",
          category: "Volume 22",
          title: " ",
          sectors: "",
          date: "March 2025",
          description:
            "Fast-tracking High-Speed Rail",
          link: "/assets/pdf/letter3.pdf",
        },
        {
          id: 4,
          img: "/assets/archive/newsletter/newsletter4.png",
          category: "Volume 21",
          title: " ",
          sectors: "",
          date: "February 2025",
          description:
            "CAIRA Roundtable on agri exports is a success",
          link: "/assets/pdf/letter4.pdf",
        },
        {
          id: 5,
          img: "/assets/archive/newsletter/newsletter5.png",
          category: "Volume 20",
          title: " ",
          sectors: "",
          date: "January 2025",
          description:
            "Workshop on Trees Outside Forests",
          link: "/assets/pdf/letter5.pdf",
        },
         {
          id: 6,
          img: "/assets/archive/newsletter/newsletter6.png",
          category: "Volume 19",
          title: " ",
          sectors: "",
          date: "December 2024",
          description:
            "Telling the story of India",
          link: "/assets/pdf/letter6.pdf",
        },
         {
          id: 7,
          img: "/assets/archive/newsletter/newsletter7.png",
          category: "Volume 18",
          title: " ",
          sectors: "",
          date: "November 2024",
          description:
            "CAIRA takes shape",
          link: "/assets/pdf/letter7.pdf",
        },
         {
          id: 8,
          img: "/assets/archive/newsletter/newsletter8.png",
          category: "Volume 17",
          title: " ",
          sectors: "",
          date: "October 2024",
          description:
            "The Infravision Fellowship",
          link: "/assets/pdf/letter8.pdf",
        },
         {
          id: 9,
          img: "/assets/archive/newsletter/newsletter9.png",
          category: "Volume 16",
          title: " ",
          sectors: "",
          date: "September 2024",
          description:
            "Understanding Land Value Capture in urban India",
          link: "/assets/pdf/letter9.pdf",
        },
          {
          id: 10,
          img: "/assets/archive/newsletter/newsletter10.png",
          category: "Volume 15",
          title: " ",
          sectors: "",
          date: "August 2024",
          description:
            "The need for high-speed rail corridors",
          link: "/assets/pdf/letter10.pdf",
        },
        {
          id: 11,
          img: "/assets/archive/newsletter/newsletter11.png",
          category: "Volume 14",
          title: " ",
          sectors: "",
          date: "July 2024",
          description:
            "Champions Lab takes off",
          link: "/assets/pdf/letter11.pdf",
        },
        {
          id: 12,
          img: "/assets/archive/newsletter/newsletter12.png",
          category: "Volume 13",
          title: " ",
          sectors: "",
          date: "June 2024",
          description:
            "The building blocks of mythology",
          link: "/assets/pdf/letter12.pdf",
        },
        {
          id: 13,
          img: "/assets/archive/newsletter/newsletter13.png",
          category: "Volume 12",
          title: " ",
          sectors: "",
          date: "May 2024",
          description:
            "Diving into the water bodies census",
          link: "/assets/pdf/letter13.pdf",
        },
        {
          id: 14,
          img: "/assets/archive/newsletter/mumbai.png",
          category: "Volume 11",
          title: " ",
          sectors: "",
          date: "April 2024",
          description:
            "Sustainability Ratings is the buzz in Mumbai",
          link: "/assets/pdf/letter14.pdf",
        },
        {
          id: 15,
          img: "/assets/archive/newsletter/newsletter15.png",
          category: "Volume 10",
          title: " ",
          sectors: "",
          date: "March 2024",
          description:
            "No grain drain",
          link: "/assets/pdf/letter15.pdf",
        },
        {
          id: 16,
          img: "/assets/archive/newsletter/newsletter16.png",
          category: "Volume 9",
          title: " ",
          sectors: "",
          date: "February 2024",
          description:
            "Sooraj Se Rozgari gets PM nod",
          link: "/assets/pdf/letter16.pdf",
        },
      
          {
          id: 17,
          img: "/assets/archive/newsletter/newsletter17.png",
          category: "Volume 8",
          title: " ",
          sectors: "",
          date: "January 2024",
          description:
            "Taking Surety Bonds and Sustainability Ratings to industry audience in Bangalore",
          link: "/assets/pdf/letter17.pdf",
        },
           {
          id: 18,
          img: "/assets/archive/newsletter/newsletter18.png",
          category: "Volume 7",
          title: " ",
          sectors: "",
          date: "December 2023",
          description:
            "Making commodities count for more",
          link: "/assets/pdf/letter18.pdf",
        },
          {
          id: 19,
          img: "/assets/archive/newsletter/newsletter19.png",
          category: "Volume 6",
          title: " ",
          sectors: "",
          date: "November 2023",
          description:
            "Ideas aplenty at quarterly meeting",
          link: "/assets/pdf/letter19.pdf",
        },
         {
          id: 20,
          img: "/assets/archive/newsletter/newsletter20.png",
          category: "Volume 5",
          title: " ",
          sectors: "",
          date: "October 2023",
          description:
            "Green signal for green ratings",
          link: "/assets/pdf/letter20.pdf",
        },
         {
          id: 21,
          img: "/assets/archive/newsletter/newsletter21.png",
          category: "Volume 4",
          title: " ",
          sectors: "",
          date: "September 2023",
          description:
            "Smart city, smart PT",
          link: "/assets/pdf/letter21.pdf",
        },
          {
          id: 22,
          img: "/assets/archive/newsletter/newsletter22.png",
          category: "Volume 3",
          title: " ",
          sectors: "",
          date: "August 2023",
          description:
            "The quarterly meeting",
          link: "/assets/pdf/letter22.pdf",
        },
         {
          id: 23,
          img: "/assets/archive/newsletter/newsletter23.png",
          category: "Volume 2",
          title: " ",
          sectors: "",
          date: "July 2023",
          description:
            "City mobility",
          link: "/assets/pdf/letter23.pdf",
        },
           {
          id: 24,
          img: "/assets/archive/newsletter/newsletter24.png",
          category: "Volume 1",
          title: " ",
          sectors: "",
          date: "June 2023",
          description:
            "Here comes the sun",
          link: "/assets/pdf/letter24.pdf",
        },
      
      ];
  
  /**
   * Get newsletter content with pagination
   * @param paginationDto Pagination parameters
   * @returns Paginated newsletter content
   */
  async getNewsletter(paginationDto: PaginationDto): Promise<PaginatedResult<any>> {
    const { page = 1, limit = 10 } = paginationDto;
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    const total = this.newsletters.length;
    const totalPages = Math.ceil(total / limit);
    
    // Get paginated data
    const paginatedNewsletters = this.newsletters.slice(skip, skip + limit);
    
    return {
      data: paginatedNewsletters,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}
