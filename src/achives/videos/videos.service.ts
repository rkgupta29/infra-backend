import { Injectable } from '@nestjs/common';


@Injectable()
export class VideosService {
  /**
   * Get all patrons
   * @returns Static patrons data
   */
  async getVideos() {
    const videos: any[] =  [
      {
        image: "/assets/archive/video/pratapPadode.jpg",
        subtitle: "The Infravision Conversation",
        subdesc:
          "Pratap Padode discusses India's urban infrastructure challenges and project completion hurdles.",
        link: "https://www.youtube.com/embed/w6oJTRqeB4A?si=fNSLkZPbNsVTcCy8",
        date: "June 10, 2025",
      },
      {
        image: "/assets/archive/video/jaganShah.jpg",
        subtitle: "The Infravision Conversation",
        subdesc:
          "“Why India needs a national plan to build new cities” with Jagan Shah",
        link: "https://www.youtube.com/embed/g5aA3Q3af1g?si=HaWJ-KxdUmMYZNSU",
        date: "June 5, 2025",
      },
      {
        image: "/assets/archive/video/montek.jpg",
        subtitle: "Infrakatha",
        subdesc:
          "“Can Public-Private Partnerships be revitalised?” with Montek Singh Ahluwalia",
        link: "https://www.youtube.com/embed/o6nb3IejARc?si=sdTSSC9qO-H5wTtJ",
        date: "December 14, 2024",
      },
      {
        image: "/assets/archive/video/william.jpg",
        subtitle: "Infrakatha",
        subdesc: "“Indosphere: How Indian trade grew” with William Dalrymple",
        link: "https://www.youtube.com/embed/ae8InU9IGgk?si=70Apj6l17Hy3fZNT",
        date: "November 24, 2024",
      },
      {
        image: "/assets/archive/video/shailesh.jpg",
        subtitle: "Infrakatha",
        subdesc: "“Artificial Intelligence: Reshaping the digital infra landscape” with Shailesh Kochhar",
        link: "https://www.youtube.com/embed/hIzp4YhZcMo?si=TWyH6e0yIDExdsnz",
        date: "October 14, 2024",
      },
      {
        image: "/assets/archive/video/aman.jpg",
        subtitle: "Infrakatha",
        subdesc: "“Heritage tourism infrastructure” with Aman Nath",
        link: "https://www.youtube.com/embed/u-SEobnWU6U?si=Ucr2AcyXUFa3qXTs",
        date: "September 7, 2024",
      },
      {
        image: "/assets/archive/video/sanjeev.jpg",
        subtitle: "Infrakatha",
        subdesc: "“Saraswati, the lost river: Lessons for today” with Sanjeev Sanyal",
        link: "https://www.youtube.com/embed/sygLq4cccIY?si=FJMqVBwipj1Nfrnt",
        date: "August 17, 2024",
      },
      {
        image: "/assets/archive/video/gurcharan.jpg",
        subtitle: "Infrakatha",
        subdesc: "“Indian infrastructure - The difficulty of being good” with Gurcharan Das",
        link: "https://www.youtube.com/embed/FCDeGlsb7q0?si=RZ4a7Y-tvUa1BHyO",
        date: "July 19, 2024",
      },
      {
        image: "/assets/archive/video/deepa.jpg",
        subtitle: "Infrakatha",
        subdesc: "“Inclusive infrastructure” with Deepa Malik",
        link: "https://www.youtube.com/embed/5uzHmHzU7q0?si=pvFpa0D2SODp30c7",
        date: "June 19, 2024",
      },
      {
        image: "/assets/archive/video/devdutt.jpg",
        subtitle: "Infrakatha",
        subdesc: "“Mythology & infrastructure” with Devdutt Pattanaik",
        link: "https://www.youtube.com/embed/9v61vpPmXEk?si=mF1zuXMO5923j-L1",
        date: "May 29, 2024",
      },
      {
        image: "/assets/archive/video/shubhi.jpg",
        subtitle: "InfraShakti Awards",
        subdesc: "Infrashakti Award Nominee Shubhi Sachan",
        link: "https://www.youtube.com/embed/RRTTBm62AvQ?si=0g9KHD-ULaJ0fbZH",
        date: "November 30, 2023",
      },
      {
        image: "/assets/archive/video/arun.jpg",
        subtitle: "InfraShakti Awards",
        subdesc: "InfraShakti Award Nominee Arun Krishnamurthy",
        link: "https://www.youtube.com/embed/BV9a00zFR88?si=61j7qJrU6DfeUQQx",
        date: "November 1, 2023",
      },
      {
        image: "/assets/archive/video/thalappil.jpg",
        subtitle: "InfraShakti Awards",
        subdesc: "InfraShakti Award Nominee Prof Thalappil Pradeep",
        link: "https://www.youtube.com/embed/RujXLvkjRgA?si=WxUXqPwQfs4eS_mF",
        date: "September 15, 2023",
      },
      {
        image: "/assets/archive/video/anita.jpg",
        subtitle: "The Infravision Conversation",
        subdesc: "“Wild areas are necessary in cities, they allow Nature to breathe” with Anita Mani",
        link: "https://www.youtube.com/embed/S4gStG-y7qM?si=0PFGR2PNkNlUo8nY",
        date: "May 30, 2024",
      },
      {
        image: "/assets/archive/video/gita.jpg",
        subtitle: "The Infravision Conversation",
        subdesc: "“A walk for a cause” with Gita Balakrishnan",
        link: "https://www.youtube.com/embed/5jrEtMe-t6c?si=DTFSYNVFkHydf64i",
        date: "May 30, 2024",
      },
      {
        image: "/assets/archive/video/renewable.jpg",
        subtitle: "The Infravision Conversation",
        subdesc: "“Renewable energy 2024 - Storage will be the main focus” with Nitin Zamre",
        link: "https://www.youtube.com/embed/q25SQpLHlDc?si=jNsegPrOT7zBNgAO",
        date: "January 12, 2024",
      },
      {
        image: "/assets/archive/video/akhilesh.jpg",
        subtitle: "InfraShakti Awards",
        subdesc: "The awards ceremony",
        link: "https://www.youtube.com/embed/7nkY4yY0I-g?si=6kXh1arx3LUW7B9s",
        date: "July 3, 2024",
      },
      {
        image: "/assets/archive/video/akhilesh1.jpg",
        subtitle: "InfraShakti Awards",
        subdesc: "Infrashakti Award Nominee Akhilesh Srivastava",
        link: "https://www.youtube.com/embed/unFAFA1Eg8U?si=LaTR2CQ4ndSy2RaL",
        date: "March 21, 2024",
      },
      {
        image: "/assets/archive/video/chetan.jpg",
        subtitle: "InfraShakti Awards",
        subdesc: "Infrashakti Award Nominee Chetan Singh Solanki",
        link: "https://www.youtube.com/embed/wWqeHQUlVbw?si=LNv7f0Jp6Xi3ZWzY",
        date: "March 20, 2024",
      },
      {
        image: "/assets/archive/video/sudhanshu.jpg",
        subtitle: "InfraShakti Awards",
        subdesc: "Infrashakti Award Nominee Sudhanshu Mani",
        link: "https://www.youtube.com/embed/tuadLyzj3A0?si=gnAhQWZprcHozR3e",
        date: "January 6, 2024",
      },
      {
        image: "/assets/archive/video/22.jpg",
        subtitle: "Projects",
        subdesc: "Solar rooftop for poverty alleviation",
        link: "https://www.youtube.com/embed/SGoq2OpxMuA?si=Sh8-NtTPffSQ8VKh",
        date: "May 16, 2023",
      },
      {
        image: "/assets/archive/video/23.jpg",
        subtitle: "Projects",
        subdesc: "Sooraj Se Rozgaari",
        link: "https://www.youtube.com/embed/L8DQjjO84KA?si=bE_YosNXZv4CkAIJ",
        date: "May 16, 2023",
      },
      {
        image: "/assets/archive/video/24.jpg",
        subtitle: "Projects",
        subdesc: "Sooraj Se Rozgaari",
        link: "https://www.youtube.com/embed/XpTj0m03cQk?si=NBQNYWP0AN8d5F9E",
        date: "May 16, 2023",
      },
      {
        image: "/assets/archive/video/25.jpg",
        subtitle: "Projects",
        subdesc: "Solar rooftop scale-up challenges",
        link: "https://www.youtube.com/embed/j-n-z551_ts?si=w0jyCZ-IoRHDW6va",
        date: "May 16, 2023",
      },
      {
        image: "/assets/archive/video/26.jpg",
        subtitle: "Quarterly meet",
        subdesc: "Is there enough butter to spread on the infrastructure toast?",
        link: "https://www.youtube.com/embed/-INuUJJwYdk?si=fBlesjz6-sotbW6N",
        date: "August 21, 2023",
      },
      {
        image: "/assets/archive/video/27.jpg",
        subtitle: "Quarterly meet",
        subdesc: "Jagan Shah at the quarterly meet ",
        link: "https://www.youtube.com/embed/JjJNPWFyEcI?si=658FE8bHq_Mi-ZW9",
        date: "July 29, 2023",
      },
      {
        image: "/assets/archive/video/28.jpg",
        subtitle: "Quarterly meet",
        subdesc: "P.K. Sinha at the quarterly meet",
        link: "https://www.youtube.com/embed/KAnR0Y1F648?si=7DcNoVonOJ1vq5zk",
        date: "July 29, 2023",
      },
      {
        image: "/assets/archive/video/29.jpg",
        subtitle: "Quarterly meet",
        subdesc: "P.K. Sinha at the quarterly meet",
        link: "https://www.youtube.com/embed/3AHKaWYgl-E?si=Jocd2IuZYavBQ8OJ",
        date: "July 29, 2023",
      },
      {
        image: "/assets/archive/video/30.jpg",
        subtitle: "Quarterly meet",
        subdesc: "Rajnish Kumar at the quarterly meet",
        link: "https://www.youtube.com/embed/gkzbBcok8Rc?si=DlFGYDR2evCt8OUO",
        date: "July 29, 2023",
      },
      {
        image: "/assets/archive/video/31.jpg",
        subtitle: "Quarterly meet",
        subdesc: "Ashish Dhawan at the quarterly meet",
        link: "https://www.youtube.com/embed/6FYnql27r6A?si=vo_ixfXiwuJi5_6V",
        date: "July 29, 2023",
      },
      {
        image: "/assets/archive/video/32.jpg",
        subtitle: "Quarterly meet",
        subdesc: "Ashish Dhawan at the quarterly meet",
        link: "https://www.youtube.com/embed/RKsWrBXjqX4?si=WGrzdgZiYyav_uT-",
        date: "July 29, 2023",
      },
      {
        image: "/assets/archive/video/33.jpg",
        subtitle: "Quarterly meet",
        subdesc: "Panel discussion on “The challenges ahead for core & social infra”",
        link: "https://www.youtube.com/embed/PX-s_58ixLk?si=gK5X4pM8ssEPWUA-",
        date: "March 4, 2023",
      },
      {
        image: "/assets/archive/video/34.jpg",
        subtitle: "The Infravision Conversation",
        subdesc: "“Air pollution: The solution has to be multi-sectoral” with Jagan Shah",
        link: "https://www.youtube.com/embed/OjrOlknqzu4?si=5Q6-IiWLGFifYs7q",
        date: "November 14, 2023",
      },
      {
        image: "/assets/archive/video/35.jpg",
        subtitle: "The Infravision Conversation",
        subdesc: "How to save our hill cities” with Rajiv Ranjan Mishra",
        link: "https://www.youtube.com/embed/ZdLcdjJShW8?si=SRPBGu8EprseFFew",
        date: "October 11, 2023",
      },
      {
        image: "/assets/archive/video/36.jpg",
        subtitle: "The Infravision Conversation",
        subdesc: "“Making metro systems financially viable” with Prof Sandip Chakrabarti",
        link: "https://www.youtube.com/embed/H34LNACsKZw?si=OA7wNJwRAxX-SRio",
        date: "October 11, 2023",
      },
      {
        image: "/assets/archive/video/37.jpg",
        subtitle: "The Infravision Conversation",
        subdesc: "“Sustainability Ratings: An idea whose time has come” with Rajaji Meshram",
        link: "https://www.youtube.com/embed/Jis2Q7oOfr0?si=VXMIcQ5ubUGSpqiA",
        date: "September 15, 2023",
      },
      {
        image: "/assets/archive/video/38.jpg",
        subtitle: "The Infravision Conversation",
        subdesc: "“Selecting the appropriate urban transport system for India's cities” with Prof Geetam Tiwari",
        link: "https://www.youtube.com/embed/Sr17ZN7FLA4?si=jGz9T1xcEMrcr-Zk",
        date: "August 27, 2023",
      },
    ];
    

    return {
      videos,
      totalCount: videos.length,
      lastUpdated: new Date().toISOString()
    };
  }
}
