import { Injectable } from '@nestjs/common';
import { PaginatedResult } from '../types/utils';

interface MediaCoverageQuery {
  page: number;
  limit: number;
  search?: string;
  category?: string;

}

export interface MediaCoverageItem {
  id: number;
  img: string;
  category: string;
  title: string;
  sectors: string;
  date: string;
  description: string;
  link: string;
}

@Injectable()
export class MediaCoverageService {
  /**
   * Get company media coverage and news mentions with pagination and search
   * @param query - Query parameters for pagination and filtering
   * @returns Paginated media coverage data
   */
  async getMediaCoverage(query: MediaCoverageQuery): Promise<PaginatedResult<MediaCoverageItem>> {
    // Generate sample media coverage data
    const allMediaCoverage: MediaCoverageItem[] = [
      {
        id: 50,
        img: "/assets/archive/newsAndMedia/coal.jpg",
        category: "News",
        title: "Vinayak Chatterjee",
        sectors: "",
        date: "July 18,2025",
        description: "Coal, Clean, Air and a Welcome Resolution",
        link: "/assets/pdf/coalClean.pdf",
      },
      {
        id: 51,
        img: "/assets/archive/newsAndMedia/infrastructure.jpg",
        category: "Research",
        title: "Smart Cities Initiative",
        sectors: "Urban Development",
        date: "July 15,2025",
        description: "New research on sustainable urban infrastructure development",
        link: "/assets/pdf/smart-cities.pdf",
      },
      {
        id: 52,
        img: "/assets/archive/newsAndMedia/transport.jpg",
        category: "Policy",
        title: "Transportation Policy Reform",
        sectors: "Transportation",
        date: "July 12,2025",
        description: "Policy recommendations for modernizing transportation infrastructure",
        link: "/assets/pdf/transport-policy.pdf",
      },
      {
        id: 53,
        img: "/assets/archive/newsAndMedia/energy.jpg",
        category: "News",
        title: "Energy Infrastructure Summit",
        sectors: "Energy",
        date: "July 10,2025",
        description: "Annual summit on energy infrastructure development",
        link: "/assets/pdf/energy-summit.pdf",
      },
      {
        id: 54,
        img: "/assets/archive/newsAndMedia/water.jpg",
        category: "Research",
        title: "Water Management Systems",
        sectors: "Water Resources",
        date: "July 8,2025",
        description: "Innovative approaches to water infrastructure management",
        link: "/assets/pdf/water-management.pdf",
      },
      {
        id: 55,
        img: "/assets/archive/newsAndMedia/digital.jpg",
        category: "Technology",
        title: "Digital Infrastructure",
        sectors: "Technology",
        date: "July 5,2025",
        description: "Digital transformation in infrastructure sector",
        link: "/assets/pdf/digital-infrastructure.pdf",
      },
      {
        id: 56,
        img: "/assets/archive/newsAndMedia/green.jpg",
        category: "Research",
        title: "Green Building Standards",
        sectors: "Construction",
        date: "July 3,2025",
        description: "New standards for sustainable construction practices",
        link: "/assets/pdf/green-standards.pdf",
      },
      {
        id: 57,
        img: "/assets/archive/newsAndMedia/railway.jpg",
        category: "Policy",
        title: "Railway Modernization",
        sectors: "Railways",
        date: "July 1,2025",
        description: "Comprehensive plan for railway infrastructure upgrade",
        link: "/assets/pdf/railway-modernization.pdf",
      },
      {
        id: 58,
        img: "/assets/archive/newsAndMedia/aviation.jpg",
        category: "News",
        title: "Aviation Infrastructure",
        sectors: "Aviation",
        date: "June 28,2025",
        description: "Expansion plans for major airports across India",
        link: "/assets/pdf/aviation-expansion.pdf",
      },
      {
        id: 59,
        img: "/assets/archive/newsAndMedia/ports.jpg",
        category: "Research",
        title: "Port Development",
        sectors: "Maritime",
        date: "June 25,2025",
        description: "Strategic development of port infrastructure",
        link: "/assets/pdf/port-development.pdf",
      },
      {
        id: 60,
        img: "/assets/archive/newsAndMedia/telecom.jpg",
        category: "Technology",
        title: "5G Infrastructure",
        sectors: "Telecommunications",
        date: "June 22,2025",
        description: "Rollout of 5G infrastructure across major cities",
        link: "/assets/pdf/5g-rollout.pdf",
      },
      {
        id: 61,
        img: "/assets/archive/newsAndMedia/healthcare.jpg",
        category: "Policy",
        title: "Healthcare Infrastructure",
        sectors: "Healthcare",
        date: "June 20,2025",
        description: "National healthcare infrastructure development plan",
        link: "/assets/pdf/healthcare-plan.pdf",
      },
      {
        id: 62,
        img: "/assets/archive/newsAndMedia/education.jpg",
        category: "Research",
        title: "Educational Facilities",
        sectors: "Education",
        date: "June 18,2025",
        description: "Modernization of educational infrastructure",
        link: "/assets/pdf/education-modernization.pdf",
      },
      {
        id: 63,
        img: "/assets/archive/newsAndMedia/agriculture.jpg",
        category: "News",
        title: "Agricultural Infrastructure",
        sectors: "Agriculture",
        date: "June 15,2025",
        description: "Investment in agricultural infrastructure development",
        link: "/assets/pdf/agricultural-investment.pdf",
      },
      {
        id: 64,
        img: "/assets/archive/newsAndMedia/renewable.jpg",
        category: "Research",
        title: "Renewable Energy",
        sectors: "Energy",
        date: "June 12,2025",
        description: "Renewable energy infrastructure expansion",
        link: "/assets/pdf/renewable-expansion.pdf",
      }
    ];

    // Apply search filter
    let filteredData = allMediaCoverage;
    if (query.search) {
      const searchTerm = query.search.toLowerCase();
      filteredData = filteredData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.sectors.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (query.category) {
      filteredData = filteredData.filter(item => 
        item.category.toLowerCase() === query.category!.toLowerCase()
      );
    }

    // Calculate pagination
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / query.limit);
    const currentPage = Math.min(query.page, totalPages);
    const startIndex = (currentPage - 1) * query.limit;
    const endIndex = startIndex + query.limit;
    
    // Get paginated data
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Return using the existing PaginatedResult interface
    return {
      data: paginatedData,
      meta: {
        total: totalItems,
        page: currentPage,
        limit: query.limit,
        totalPages: totalPages || 1,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1
      }
    };
  }
}
