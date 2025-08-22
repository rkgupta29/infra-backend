import { Injectable } from '@nestjs/common';


@Injectable()
export class GalleryService {
  /**
   * Get all patrons
   * @returns Static patrons data
   */
  async getGallery() {
    const gallery: any[] =  [
      {
        image: "assets/archive/gallery/image1.png",
        year: 2025,
        event: "Infrashakti",
        description:
          "The Infravision Foundation CEO Jagan Shah, at the CII South India Annual Convention 2025.",
      },
      {
        image: "assets/archive/gallery/image6.png",
        year: 2025,
        event: "Annual Get-together 2025",
        description:"The Infravision Foundation CEO Jagan Shah, delivering the welcome address.",
      },
      {
        image: "assets/archive/gallery/image11.png",
        year: 2023,
        event: "Infrashakti",
        description:
          "The Infravision Foundation Co-Founder, Rumjhum Chatterjee, at an interactive discussion with employees from Suzuki Motor Corporation, Japan, at IIM Ahmedabad’s Next Bharat Thinking programme.",
      },
      {
        image: "assets/archive/gallery/image2.png",
        year: 2024,
        event: "Infrashakti Awards",
        description:" Hon'ble Union Minister Mr Nitin Gadkari presenting the Transport Trailblazer Award to Mr Giridhar Rajagopalan, Deputy Managing Director at AFCONS Infrastructure Limited.",
      },
      {
        image: "assets/archive/gallery/image7.png",
        year: 2025,
        event: "Annual Get-together 2025",
        description:"The Infravision community at the Foundation’s annual get-together.",
      },
      {
        image: "assets/archive/gallery/new1.png",
        year: 2024,
        event: "Infrashakti",
        description: "The second Municipal Finance Champions Lab, organised by The Infravision Foundation, underway at IIM Mumbai with key stakeholders.",
      },
      {
        image: "assets/archive/gallery/new4.png",
        year: 2025,
        event: "Infrapandit Awards",
        description:
          "The Infravision Foundation team presenting the study on “Implementation of Compensatory Afforestation in India” to the Union Minister of Environment, Forest and Climate Change,  Mr Bhupender Yadav.",
      },
    
      {
        image: "assets/archive/gallery/image8.png",
        year: 2025,
        event: "Annual Get-together 2025",
        description:"The Infravision community at the Foundation’s annual get-together.",
      },
    
      {
        image: "assets/archive/gallery/image13.png",
        year: 2025,
        event: "Annual Get-together 2025",
        description: "The Infravision community at the Foundation’s annual get-together.",
      },
      {
        image: "assets/archive/gallery/new2.png",
        year: 2025,
        event: "Infrashakti",
        description: "Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, facilitating IIT Delhi Professor Emeritus Dr Geetam Tiwari at a national seminar on Decarbonising Urban Transport.",
      },
      {
        image: "assets/archive/gallery/image9.png",
        year: 2025,
        event: "Annual Get-together 2025",
        description:
          "The Infravision community at the Foundation’s annual get-together.",
      },
      {
        image: "assets/archive/gallery/new3.png",
        year: 2023,
        event: "Infrashakti",
        description:
          "Debasish Panda, Chairman of the Insurance Regulatory and Development Authority of India (IRDAI), speaking at the roundtable on Surety Bonds organised by the CII under the auspices of The Infravision Foundation.",
      },
      {
        image: "assets/archive/gallery/image5.png",
        year: 2025,
        event: "Infrashakti Awards",
        description:
          "NDTV Editor-in-Chief Mr Sanjay Pugalia with three-time Grammy Award winner and  Padma Shri awardee Mr Ricky Kej.",
      },
    
      {
        image: "assets/archive/gallery/image10.png",
        year: 2023,
        event: "Infrashakti",
        description:
          "Ms Rumjhum Chatterjee, Co-Founder, The Infravision Foundation; at CII’s Corporate Women Leadership Awards, along with Ms Radhika Gupta, MD and CEO, Edelweiss Asset Management; Ms Ameera Shah, Promoter and MD, Metropolis Healthcare; Ms Rituparna Chakraborty, Co-Founder, Teamlease Services; and others.",
      },
      {
        image: "assets/archive/gallery/image15.png",
        year: 2023,
        event: "Infrashakti",
        description: "JCB CEO Deepak Shetty, The Infravision Foundation Founder and Managing Trustee Vinayak Chatterjee, IRDAI Chairman Debasish Panda, and Bajaj Allianz CEO Tapan Singhel at a roundtable on Surety Bonds organised by CII.",
      },
    ];
    

    return {
      gallery,
      totalCount: gallery.length,
      lastUpdated: new Date().toISOString()
    };
  }
}
