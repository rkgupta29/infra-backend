import { Injectable } from '@nestjs/common';


@Injectable()
export class ResearchPapersService {
  /**
   * Get all patrons
   * @returns Static patrons data
   */
  async getResearchPapers() {
    const researchPapers: any[] =[
      {
        id: 13,
        img: "/assets/knowledeg/researchPapers/13.png",
        category: "Infrastructure",
        title: "",
        sectors: "Infrastructure",
        date: " ",
        description: "Removing Barriers to Faster Penetration of Trees Outside Forests Productsin Construction Sector",
        link: "/assets/pdf/removing-barriers-to-faster-penetration-of-trees-final-report.pdf",
      },
      {
        id: 10,
        img: "/assets/knowledeg/researchPapers/12.jpg",
        category: "Urban Planning",
        title: "",
        sectors: "Urban Planning",
        date: " ",
        description: "Relieving urban congestion and promoting tourism through ropeways",
        link: "/assets/pdf/urbanCongestion.pdf",
      },
      {
        id: 1,
        img: "/assets/knowledeg/researchPapers/01.jpg",
        category: "Rural and Agri Infra",
        title: "",
        sectors: "Rural and Agri Infra",
        date: "",
        description: "Study on the implementation of compensatory afforestation in India",
        link: "/assets/pdf/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
      },
      {
        id: 2,
        img: "/assets/knowledeg/researchPapers/02.jpg",
        category: "Transportation",
        title: "",
        sectors: "Transportation",
        date: " ",
        description: "The case for developing high-speed rail corridors in India",
        link: "/assets/pdf/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf",
      },
      {
        id: 3,
        img: "/assets/knowledeg/researchPapers/03.jpg",
        category: "Transportation",
        title: "",
        sectors: "Transportation",
        date: " ",
        description: "Safe highways in India: Challenges and solutions",
        link: "/assets/pdf/Safe-Highways-in-India-Challenges-and-Solutions_August-2024.pdf",
      },
      {
        id: 4,
        img: "/assets/knowledeg/researchPapers/04.jpg",
        category: "Transportation",
        title: "",
        sectors: "Transportation",
        date: " ",
        description: "Strategies to improve the financial performance of the metro rail system",
        link: "/assets/pdf/Metro-Rail-Systems-Whitepaper.pdf",
      },
      {
        id: 5,
        img: "/assets/knowledeg/researchPapers/05.jpg",
        category: "Urban Planning",
        title: "",
        sectors: "Urban Planning",
        date: " ",
        description: "Sustainability ratings for Infrastructure projects in India",
        link: "/assets/pdf/Sustainability-Rating-Infra-Whitepaper-2.pdf",
      },
      {
        id: 6,
        img: "/assets/knowledeg/researchPapers/06.jpg",
        category: "Energy",
        title: "",
        sectors: "Energy",
        date: " ",
        description: "Mass scale rooftop solar programme for poverty alleviation",
        link: "/assets/pdf/solar.pdf",
      },
      {
        id: 7,
        img: "/assets/knowledeg/researchPapers/07.jpg",
        category: "Transportation",
        title: "",
        sectors: "Transportation",
        date: " ",
        description: "A framework for selecting an appropriate urban transport system",
        link: "/assets/pdf/Urban-Transport-Project-White-Paper.pdf",
      },
      {
        id: 8,
        img: "/assets/knowledeg/researchPapers/08.jpg",
        category: "Infrastructure",
        title: "",
        sectors: "Infrastructure",
        date: " ",
        description: "Surety bonds: Evaluation for diversifying risk in infrastructure financing",
        link: "/assets/pdf/Surety-Bond-White-Paper.pdf",
      },
      {
        id: 9,
        img: "/assets/knowledeg/researchPapers/09.jpg",
        category: "Rural and Agri Infra",
        title: "",
        sectors: "Rural and Agri Infra",
        date: " ",
        description: "Ways to enhance warehouse-based sales and lending for agriculture commodities",
        link: "/assets/pdf/Warehousing-Whitepaper.pdf",
      },
      {
        id: 11,
        img: "/assets/knowledeg/researchPapers/10.png",
        category: "Urban Planning",
        title: "",
        sectors: "Urban Planning",
        date: " ",
        description: "Decarbonizing urban transport using traffic and transport data from ICCC: A Pilot Study in NOIDA",
        link: "/assets/pdf/decarbonizing.pdf",
      },
      {
        id: 12,
        img: "/assets/knowledeg/researchPapers/11.jpg",
        category: "Rural and Agri Infra",
        title: "",
        sectors: "Rural and Agri Infra",
        date: " ",
        description: "Expanding agricultural exports of Arunachal Pradesh through infrastructure development",
        link: "/assets/pdf/expanding.pdf",
      },
    ];
    
    

    return {
        researchPapers,
      totalCount: researchPapers.length,
      lastUpdated: new Date().toISOString()
    };
  }
}
