import { Injectable } from '@nestjs/common';

export interface Trustee {
  id: number;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  order: number;
}

@Injectable()
export class TrusteesService {
  /**
   * Get all trustees
   * @returns Static trustees data
   */
  async getTrustees() {
    const trustees: any[] = [
      {
        image: "/assets/home/trustees/vinayakImg.png",
        title: "Vinayak Chatterjee",
        desig: "Founder & Managing Trustee",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://x.com/infra_vinayakch?lang=en",
        socialMedia: "X",
        popupdesc: `Vinayak Chatterjee co-founded Feedback Infra Pvt Ltd in 1990 and served as its Chairman from 1990 to 2021. Since stepping down from active management, he now dedicates his time and energy to infrastructure policy and advocacy, as well as to nurturing educational institutions.\n
    
    Mr Chatterjee is frequently called upon to play a strategic advisory role to leading domestic and international corporates, the Government of India, various ministries involved in infrastructure, and multilateral and bilateral institutions in the areas of infrastructure policy, planning, and implementation. He is a leading proponent of the Public-Private Partnership (PPP) model for developing India's infrastructure. His more recent engagements with the Government of India include being a member of the Committee on setting up a Development Finance Institution (DFI) and a member of the Consultative Group on PPPs at NITI Aayog.\n
    
    In 1998, the World Economic Forum at Davos recognised him as one of the 100 Global Leaders of Tomorrow. In 2011, the Indian Institute of Management, Ahmedabad, conferred on him the "Distinguished Alumnus Award".\n
    
    Mr Chatterjee is currently the Chairman of the Confederation of Indian Industry's (CII) National Council on Infrastructure and has chaired various infrastructure and economic committees at the national level of CII since 2001. He is on the Board of Directors of ACC Ltd, Apollo Hospitals Enterprise Ltd, KEC International Ltd, and L&T Infotech Ltd; and is a member of the Advisory Board of JCB India. He serves as the Chairman of the Board of Governors of the Indian Institute of Technology, Dharwad, and on the Boards of the Indian Institute of Management, Sirmaur, and the National Rail and Transportation Institute, Vadodara.\n
    
    He is a popular columnist and writes a monthly column on infrastructure for Business Standard called "INFRATALK". He has also authored a book titled "Getting it Right – India's Unfolding Infrastructure Agenda", published in 2011.\n
    
    Mr Chatterjee graduated in Economics (Hons.) from St. Stephen's College, Delhi University (1976-1979) and completed his MBA from the Indian Institute of Management, Ahmedabad (1979–1981).
    `,
      },
      {
        image: "/assets/home/trustees/Rumjhum.jpg",
        title: "Rumjhum Chatterjee",
        desig: "Co-Founder & Managing Trustee",
        link: "https://www.linkedin.com/in/rumjhum-chatterjee-396041268/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/rumjhumImg.png",

        popupdesc: `
    Rumjhum Chatterjee co-founded the Feedback Infra Group. Following a successful tenure, she recently stepped down from her role as Group Managing Director and Head-Human Capital within the organisation.\n
    
    She is currently the Chairperson of the Feedback Foundation Charitable Trust. The Trust is deeply involved in rural and urban sanitation, including solid waste management, and has successfully implemented numerous projects nationwide through community engagement. Ms Chatterjee pioneered community-led interventions for Resettlement and Rehabilitation (R&R) post land acquisition for infrastructure projects. Her paper, "Sustainable Rehabilitation Interventions through Community Engagement," was published in the India Infrastructure Report 2009, issued by the 3iNetwork.\n
    
    A leading practitioner in human capital management within the infrastructure sector, she was recognised as one of the 20 Most Talented HR Leaders in India by the World HRD Congress in 2013. She plays an active role in the Confederation of Indian Industry (CII), notably as the first woman Chairperson for the CII Northern Regional Council (2016-17). With a deep interest in women's empowerment, she chaired CII's Women Exemplar Program (2015-17) and has served on its Jury Selection Committee since its inception in 2005. She also chaired the CII National Women's Empowerment Committee for several years, representing industry perspectives on this critical issue before Parliamentarians in India. Furthermore, she participated in a closed-door interaction to discuss this topic with the Prime Minister of Japan, Mr. Shinzo Abe, during his visit to India in January 2014.\n
    
    Currently, she co-chairs CII's National Committee on CSR. She previously served as an Independent Director on the Board of Blue Star Ltd. and presently serves on the Boards of Somany Ceramics Ltd. and C&S Electric Ltd. (a subsidiary of Siemens India Ltd.). She is the Vice Chairperson and a member of the Governing Body of HelpAge India, the country's largest not-for-profit organisation dedicated to the welfare of the aged. She is also a Trustee of HDFC Schools. Ms Chatterjee holds a degree in Psychology from Calcutta University.
    
          `,
      },

      {
        image: "/assets/home/trustees/Kiran.jpg",
        title: "Kiran Karnik",
        desig:
          "Trustee, The Infravision Foundation; Former President, NASSCOM; Former MD and CEO, Discovery Networks in India",
        popupImg: "/assets/home/trustees/kiranImg.png",
        popupdesc: `Kiran Karnik is a distinguished professional with a career spanning public service and the corporate world, known for his pioneering contributions to India's communications industry. He has consistently operated at the cutting edge of technology, from working with the great Vikram Sarabhai to establish the Satellite Instructional Television Experiment, to laying the foundations of the Discovery Channel and Animal Planet in India.\n
    
    Governments frequently rely on his expertise in times of crisis, as demonstrated by his leadership in managing NASSCOM following the sudden passing of Dewang Mehta, and heading the Satyam Computer Services board after its disbandment due to irregularities. His remarkable ability to navigate technological transitions and mentor others has positioned him as a valuable national asset.\n
    
    Mr Karnik has served as President of the India Habitat Centre and Chairman of IIITD, and currently chairs HelpAge India. He has also been conferred the prestigious Padma Shri award. We are honoured that he guides us as a Trustee.
    
          `,
      },
    ];



    return {
      trustees,
      totalCount: trustees.length,
      lastUpdated: new Date().toISOString()
    };
  }
}
