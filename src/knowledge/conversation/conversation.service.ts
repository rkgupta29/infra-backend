import { Injectable } from '@nestjs/common';


@Injectable()
export class ConversationService {
  /**
   * Get all patrons
   * @returns Static patrons data
   */
  async getConversation() {
    const conversation: any[] = [
      {
        image: "/assets/knowledeg/conversations/08.png",
        videoLink:
          "https://www.youtube.com/watch?v=w6oJTRqeB4A&list=PLj3lfy92K7LOMALf1Catm5Y4GYNwVm8em&index=9&ab_channel=TheInfravisionFoundation",
        name: "Pratap Padode",
        title:
          "Founder and President, First Construction Council, and author, Tarmac to Towers: India’s Infrastructure Story",
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
