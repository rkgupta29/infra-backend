import { Injectable } from '@nestjs/common';

@Injectable()
export class EngagementsService {
  // Handler to get all engagements
  async allEngagements() {
    // Placeholder: Replace with actual data fetching logic
    return {data:{
        "2025": [
          {
            month: "January",
            events: [
              {
                date: "18",
    
                dayTime: "Saturday",
                meetingType: "External engagement",
                desc: "Centre for Agri Infrastructure Research and Action's (CAIRA) first Roundtable on Boosting India's agri exports by transforming infrastructure",
                ctaText: "See details",
                details: {
                  date: "January 18, 2025",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/caira_01.png",
                      description:
                        "Vinayak Chatterjee, Founder and Managing Trustee, The Infravision Foundation; Siraj Hussain, Chairman, CAIRA; Santosh Kumar Sarangi, DG, DGFT; Dr Subrata Gupta Secretary, Food Processing; Abhishek Dev, Chairman, APEDA; Siraj Chaudhry, Chairman, SATS India; S. Sivakumar, Group Head, ITC Limited, unveiling CIARA’s first background paper.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/caira_02.png",
                      description:
                        "Azhar Tambuwala, Head, International Business, Sahyadri Farms; Atul Chhura, Chief Business Officer, Agribazaar; Aneesh Jain,CEO and MD, Gram Unnati; Harvir Singh, Editor in Chief, Rural Voice; Andrew Goodland, Lead Agriculture Specialist, The World Bank; and Akhilesh Tilotia, Public Policy Expert and Member, Governing Council, CAIRA.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/caira_03.png",
                      description:
                        "Thomas Jose, Director, Choice Group; RK Boyal, Secretary General, AIMLEA; Rajeev Pandey, Director, Millets for Health; and Dr Seema Bathla, Professor, JNU, and Member, Governing Council, CAIRA.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/caira_04.png",
                      description:
                        "Jagan Shah, CEO, The Infravision Foundation and Amit Pant, Senior Vice President and Head, Soluble Business, Tata Consumer Products.",
                    },
                  ],
                  content: `
                  CAIRA’s first Roundtable on “Boosting India's agri exports by transforming infrastructure” brought together a distinguished assembly of public and private sector leaders. The event featured key decision-makers, including Subrata Gupta, Secretary of Food Processing; Santosh Sarangi, Director General of Foreign Trade; Abhishek Dev, Chairman of APEDA; and Siraj Hussain, former Union Agriculture Secretary and Chairman of CAIRA's Governing Council.\n
    
                   Notable industry voices included representatives from ITC, Tata Consumer Products, Sahyadri Farms, and Gram Unnati, ensuring a comprehensive dialogue on export infrastructure.
    `,
                  cta: {
                    ctaText: "Download report",
                    link: "/assets/pdf/CAIRA-Background-Paper-1.pdf",
                  },
                },
              },
            ],
          },
          {
            month: "Feburary",
            events: [],
          },
          {
            month: "March",
            events: [],
          },
          {
            month: "April",
            events: [
              {
                date: "17",
                dayTime: "Thursday",
                meetingType: "Internal engagement",
                desc: "Annual get-together",
                ctaText: "See details",
                details: {
                  date: "April 17, 2025",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/april1_2025.png",
                      description:
                        "The Infravision community at the Foundation’s annual get-together.",
                    },
    
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/april2_2025.png",
                      description:
                        "The Infravision community at the Foundation’s annual get-together.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/april4_2025.png",
                      description:
                        "The Infravision community at the Foundation’s annual get-together.",
                    },
                  ],
                  content: `
                    
    The Infravision Community huddled to celebrate achievements and strengthen collaborative networks to advance India's infrastructure agenda. This annual gathering showcased the Foundation's growing influence while fostering deeper connections among policy practitioners and thought leaders.\n
    
    
    The celebration featured a compelling short film documenting the Foundation's comprehensive impact, highlighting published research papers and advocacy events that shaped national infrastructure discourse. The presentation revealed the Foundation's expanding influence across policy circles and public discourse.\n
    
    
    Distinguished sitarist Mehtab Ali Niazi provided cultural enrichment, masterfully blending classical Indian music with English classics and contemporary pop, including Ed Sheeran adaptations.\n
    
    
    The evening demonstrated the Foundation's belief that creativity, ideas, and inspiration extend beyond boardrooms and conference halls into cultural expression and community building.\n
    
    
    The Foundation convened the Strategic Leadership Summit and launched the InfraPandit Awards in Mumbai. It announced a convening of its Council of Advisors and Distinguished Fellows alongside the landmark launch of its prestigious InfraPandit Awards, marking a significant milestone in recognising excellence within India's infrastructure sector.\n
    
    
    Recognising the need for enhanced strategic coordination and public recognition of infrastructure achievements, the Foundation convened its Council of Advisors and Distinguished Fellows at Mumbai's iconic Royal Bombay Yacht Club on June 20, 2025.\n
    
    
    The dual-purpose gathering strengthened the Foundation's governance while establishing the InfraPandit Awards as the Foundation's signature platform for celebrating outstanding contributions to India's infrastructure development, advancing the organisation's mission to elevate industry standards through recognition and thought leadership.
    `,
                },
              },
              {
                date: "10",
                dayTime: "Thursday",
                meetingType: "External engagement",
                desc: "Conclave-cum-Buyer-Seller meet on Expanding Arunachal Pradesh's agriculture through infrastructure development",
                ctaText: "See details",
                details: {
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/Conclave-cum-Buyer-Seller.png",
                      description:
                        "Hon. Chief Minister of Arunachal Pradesh, Pema Khandu; Minister of Agriculture, Government of Arunachal Pradesh, Gabriel Denwang Wangsu; Chief Secretary (CS), Government of Arunachal Pradesh, Manish Gupta; Former Union Secretary, Government of India, Siraj Hussain, and Chairman of APEDA, Abhishek Dev, and other guests.",
                    },
                  ],
                  date: "April 10, 2025",
    
                  content: `
    The Infravision Foundation made a field visit and did a detailed report on the potential in the state's agri exports and the infrastructure bottlenecks for the Agricultural & Processed Food Products Export Development Authority (APEDA).
    
    `,
                  cta: {
                    ctaText: "Download report",
                    link: "/assets/pdf/arunachal.pdf",
                  },
                },
              },
              {
                date: "8",
                dayTime: "Tuesday",
                meetingType: "External engagement",
                desc: "High-level roundtable: Decarbonising urban transport using ITMS data",
                ctaText: "See details",
                details: {
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/High-level-roundtable-5.png",
                      description:
                        "A diverse audience of participants and students keenly attending the national seminar.",
                    },
                  ],
                  date: "April 8, 2025",
    
                  content: `
    The Infravision Foundation organised a national seminar on “Decarbonising Urban Transport using ITMS data” based on a pioneering study conducted jointly by The Infravision Foundation and IIT Delhi.\n
    
    The study identified Noida as having exceptional potential to become a model city for data-driven decarbonisation initiatives. The seminar was widely covered by the media, including stories by DD News, IANS, and The Print.
    
    `,
                },
              },
              {
                date: "1",
                dayTime: "Tuesday",
                meetingType: "External engagement",
                desc: "Formal presentation of the Compensatory Afforestation Management and Planning Authority (CAMPA) report",
                ctaText: "See details",
    
                details: {
                  date: "April 1, 2025",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/Formal-presentation.png",
                      description:
                        "The Infravision Foundation team, including Kaveree Bamzai, Head of Advocacy; Rumjhum Chatterjee, Co-Founder & Managing Trustee; and CEO Jagan Shah, presenting the study on 'Implementation of Compensatory Afforestation in India' to the Union Minister of Environment, Forest and Climate Change, Shri Bhupender Yadav.",
                    },
                  ],
                  content: `
                  The Infravision Foundation’s Co-Founder Rumjhum Chatterjee, CEO Jagan Shah, and Advocacy Head Kaveree Bamzai presented crucial findings to Union Environment Minister Shri Bhupender Yadav, recommending comprehensive reforms to the Compensatory Afforestation Management and Planning Authority (CAMPA).\n
                   This collaborative research with The Energy and Resources Institute (TERI) identified systemic weaknesses, including poor fund utilisation, inadequate plantation outcomes, and fragmented institutional record-keeping.`,
    
                  cta: {
                    ctaText: "Download report",
                    link: "/assets/pdf/afforestation.pdf",
                  },
                },
              },
            ],
          },
          {
            month: "May",
            events: [],
          },
          {
            month: "June",
            events: [
              {
                date: "20",
                dayTime: "Friday",
                meetingType: "External engagement",
                desc: "InfraPandit Awards",
                ctaText: "See details",
                details: {
                  date: "June 20, 2025",
                  cta: {
                    ctaText: "Tell me more",
                    link: "/infrapandit-awards",
                  },
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/june1_2025.jpg",
                      description:
                        "Council of Advisors and Distinguished Fellows in conversations at the InfraPandit Awards launch event.",
                    },
                    // {image:"/assets/outreach-and-engagements/eventImages/june2_2025.jpg",
                    //   description:""
                    // },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/june3_2025.jpg",
                      description:
                        "Trustee Kiran Karnik (at podium) addresses the audience at the launch of the InfraPandit Awards. Pictured alongside are Council of Advisors member Somya Kanti Ghosh, Co-Founder and Managing Trustee Rumjhum Chatterjee, Council of Advisors member  Prof G Raghuram, and Founder and Managing Trustee Vinayak Chatterjee.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/infrapandit_2025.jpg",
                      description:
                        "Founder and Managing Trustee of The Infravision Foundation, Vinayak Chatterjee, announces the launch of the InfraPandit Awards. Also pictured are Co-Founder and  Managing Trustee Rumjhum Chatterjee, Trustee Kiran Karnik, and Council of Advisors members Somya Kanti Ghosh and Prof G Raghuram.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/infrapanditImg2_2025.jpg",
                      description:
                        "The Infravision Foundation team members Vrinda Singh, Research Associate; Rumjhum Chatterjee, Co-Founder and Managing Trustee; Vinayak Chatterjee, Founder and Managing Trustee; Jagan Shah, CEO; and Kaveree Bamzai, Head, Advocacy.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/infrapanditImg3_2025.jpeg",
                      description:
                        "Members and key stakeholders of The Infravision Foundation at the launch of the InfraPandit Awards 2025.",
                    },
                  ],
                  content: `
                 The first InfraPandit Awards will honour and celebrate groundbreaking doctoral research critical for India's infrastructure growth. Discover future leaders shaping India's development.
    
    `,
                },
              },
              //           {
              //             date: "10",
              //             dayTime: "Tuesday",
              //             meetingType: "Virtual Conversations",
              //             desc: "Infra projects in India are invariably only 90% complete",
              //             ctaText: "See details",
              //             details: {
              //               date: "June 10, 2025",
              //               images: [
              //                 {image:"/assets/outreach-and-engagements/eventImages/june10_2025.png",
              //                   description:""
              //                 },
    
              //               ],
              //               cta: {
              //                 ctaText: "Watch video",
              //                 link: "https://www.youtube.com/watch?v=w6oJTRqeB4A",
              //               },
              //               content: `
              //              While India's infrastructure projects are 90% complete, land acquisition issues and exorbitant pricing hinder the crucial last 10%. Additionally, last-mile connectivity remains a significant challenge due to a lack of planned transportation systems and overcrowded metros.\n
              //               Watch the video to delve deeper into these and other related topics as Pratap Padode, Founder of First Construction Council and author of "Tarmac to Towers: India’s Infrastructure Story", joins Infravision Conversation with The Infravision Foundation’s Head of Advocacy, Kaveree Bamzai, to break it down.
    
              // `,
              //             },
              //           },
              // {
              //   date: "5",
              //   dayTime: "Thursday",
              //   meetingType: "Virtual Conversations",
              //   desc: "Why India needs a national plan to build new cities",
              //   ctaText: "See details",
              //   details: {
              //     date: "June 5, 2025",
              //     images: [
              //       {image: "/assets/outreach-and-engagements/eventImages/june5_2025.png",
              //         description:""
              //       },
    
              //     ],
              //     cta: {
              //       ctaText: "Watch video",
              //       link: "https://www.youtube.com/watch?v=g5aA3Q3af1g&t=8s",
              //     },
              //     content: `
              //     Watch Jagan Shah, CEO of The Infravision Foundation, and Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, discuss India's critical need for a comprehensive national urban plan. They underscore the vital role of historical "brownfield" cities and renewed and newly developed "greenfield" cities in managing rapid population growth and urban chaos.\n
              //      Learn why effective planning, resource utilisation, and local self-governance are essential to transform India's urban landscape and achieve prosperity.
              //      `,
              //   },
              // },
            ],
          },
          {
            month: "July",
            events: [
              {
                date: "3",
                dayTime: "Thursday",
                meetingType: "External engagement",
                desc: "Formal presentation of the Report on ‘Expanding Agricultural Exports of Arunachal Pradesh Through Infrastructure Development",
                ctaText: "See details",
                details: {
                  date: "July 3, 2025",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/july3_2025.jpeg",
                      description: "",
                    },
                  ],
                  content: `
                  The Infravision Foundation’s CEO Jagan Shah and Advocacy Head Kaveree Bamzai presented their report to Union Minister, Development of North Eastern Region (DoNER) Shri Jyotiraditya M. Scindia, recommending strategies to augment agriculture through infrastructure development in Arunachal Pradesh.\n
                 This collaborative research with APEDA (Agricultural & Processed Food Products Export Development Authority) identified severe post-harvest losses due to cold chain gaps, lack of market linkages and certification Infrastructure.`,
                },
              },
              {
                date: "14",
                dayTime: "Monday",
                meetingType: "External engagement",
                desc: "Meeting with Odisha’s urban mobility leadership at CRUT",
                ctaText: "See details",
                details: {
                  date: "July 14, 2025",
                  images: [
                    {
                      image: "/assets/pdf/odisha.jpeg",
                      description:
                        "TIF CEO, Jagan Shah; Head of Advocacy Kaveree Bamzai; Smt. Anu Garg, IAS, DC‑cum‑ACS & Chairperson, CRUT; Smt. Usha Padhee, IAS, Principal Secretary, H&UD Department, Government of Odisha; Dr. N. Thirumala Naik, IAS, Managing Director, CRUT; Vice‑Chairman, BDA; and MD, BSCL",
                    },
                  ],
                  content: `
                 TIF CEO, Jagan Shah, and Head of Advocacy Kaveree Bamzai, had the privilege of engaging with Smt. Anu Garg, IAS, DC‑cum‑ACS & Chairperson, CRUT, Smt. Usha Padhee, IAS, Principal Secretary, H&UD Department, Government of Odisha and Dr. N. Thirumala Naik, IAS, Managing Director, CRUT, Vice‑Chairman, BDA; and MD, BSCL to discuss strategies to propel sustainable, inclusive urban mobility across Odisha, laying the groundwork for smarter, greener cities.\n`,
                },
              },
            ],
          },
          {
            month: "August",
            events: [
                         {
                          date: "18",
                          dayTime: "Monday",
                          meetingType: "External engagement",
                          desc: " HSR will be the next growth multiplier",
                          ctaText: "See details",
                          details: {
                            date: "August 18, 2025",
                            images: [
                              {
                                image:
                                  "/assets/outreach-and-engagements/eventImages/august18_2025_Img1.JPG",
                                description: "",
                              },
                               {
                                image:
                                  "/assets/outreach-and-engagements/eventImages/august18_2025_Img2.JPG",
                                description: "",
                              },
                               {
                                image:
                                  "/assets/outreach-and-engagements/eventImages/august18_2025_Img3.JPG",
                                description: "",
                              },
                               {
                                image:
                                  "/assets/outreach-and-engagements/eventImages/august18_2025_Img4.jpeg",
                                description: "",
                              },
                            ],
                            content: `
                           New report presented at High-Level Roundtable on Promoting High-Speed Rail in India \n
                           Organised by The Infravision Foundation and CII’s Rail Transportation and Equipment Division, August 18, 2025\n
                           Every kilometre of High-Speed Rail (HSR) provides nearly five times the capacity of conventional rail when utilisation exceeds 90%, while also cutting dependence on fossil fuels and significantly reducing travel time. HSR allows access to travel for intermediate towns not served by air travel, eases congestion, enables indigenisation, boosts economic competitiveness, and ensures sustainable mobility in a rapidly urbanised country. With India aiming to become a developed economy by 2047, HSR is no longer a luxury but a necessity.\n
                           Making HSR the locomotive of a new era of development in the country was the big idea at a high-level roundtable hosted by The Infravision Foundation (TIF), in collaboration with the Confederation of Indian Industries’ Rail Transportation and Equipment Division (CII-RTED). A potential investment of ₹12 lakh crore will act as a multi-year economic stimulus, creating substantial secondary and tertiary benefits as demand materialises and spending is phased across several years.\n
                           The event marked the release and discussion of TIF’s new research paper, “The Case for Developing High-Speed Rail Corridors in India” authored by Dr. Ramakrishnan T. S., which presents a compelling case for advancing HSR as a transformative mode of intercity transport in India and connecting it to the unified multi-model urban transport system. The study recommends prioritising four key HSR corridors between 2025 and 2035 \n
                            Delhi-Sonipat-Panipat-Karnal-Ambala-Chandigarh-Ludhiana-Jalandhar (566 km)\n
                            Delhi-Rewari-Jaipur-Ajmer-Jodhpur-Pali/Beenja-Palanpur-Mehsana-GandhiNagar-Ahmedabad (876 km)\n
                            Delhi-Agra-Lucknow-Ayodhya-Varanasi-Patna-Kolkata (1670 km)\n
                            Mumbai-Navi Mumbai-Pune-Satara-Kolhapur-Belagavi-Dharwad-Davengere-Tumkuru-Bengaluru-Tirupati-Chennai(1,366 km)
              — alongside developing indigenous technology to reduce dependence on imports, generate employment, and promote Atmanirbhar Bharat.\n
              The roundtable opened with a context-setting session, which underscored the need to “demystify” HSR and move beyond perceptions of elitism. Participants noted that much like the Rajdhani Express when it was first introduced in 1969, HSR may initially appear exclusive, but in time will prove to be indispensable for modern, urbanising India, especially with countries such as Japan already advancing towards 500 kmph trains.\n
              A strong consensus emerged that state governments must be brought in from the very beginning as co-owners and financiers of corridors and stations rather than leaving HSR solely to the Union government. International and domestic comparisons were used in the discussion where urban metro systems often cost more per km than HSR in some contexts, arguing that state co-investment and municipal participation (through station-area development and land-value capture) should be the norm for HSR, just as in metros. This, it was noted, can de-risk projects, align incentives locally, and strengthen long-term revenue streams.\n
              The discussion also emphasised the importance of indigenisation. India’s success in building metro and RRTS systems was cited as a precedent for creating a domestic HSR ecosystem, reducing reliance on imports, and making projects more affordable. Participants called for phased demonstration projects at 250 kmph on shorter corridors to build confidence and prove end-to-end domestic capability before scaling further.\n
              In the closing session, the focus shifted to integration and long-term planning. HSR was framed as part of a broader “system of systems,” where high-speed corridors must be seamlessly connected with regional rail, metro, and last-mile networks to fully unlock their value. This approach, combined with land-use planning and urban development strategies, can ensure HSR drives both mobility transformation and economic growth.\n
              The event reinforced that HSR is not just about speed but about reimagining India’s mobility and economic geography for Viksit Bharat 2047. As TIF Founder and Managing Trustee Vinayak Chatterjee said, a country aspiring to be the third largest economy in the world must learn to travel in speed and comfort. Developing HSR should be a national priority, added Jagan Shah, CEO, TIF.\n
              The audience was left with the exciting possibility that in the neara future, HSR could take Indians from Mumbai to Delhi in five and a half hours, the equivalent of Beijing to Shanghai, as articulated by Prof G Raghuram, Advisor, TIF and former director, IIM Bangalore.
              `
                          },
                        },
            ],
          },
          {
            month: "September",
            events: [],
          },
          {
            month: "October",
            events: [],
          },
          {
            month: "November",
            events: [],
          },
          {
            month: "December",
            events: [],
          },
        ],
        "2024": [
          {
            month: "January",
            events: [
              // {
              //   date: "12",
              //   dayTime: "Friday",
              //   meetingType: "Virtual Conversations ",
              //   desc: "Renewable energy 2024: Storage will be the main focus with Nitin Zamre",
              //   ctaText: "See details",
              //   details: {
              //     date: "Jan 12, 2024",
              //     images: [
              //        {
              //         image:
              //         "/assets/outreach-and-engagements/eventImages/januray12_2024.png",
              //       description:""
              //       }
              //     ],
              //     content: `
              //     Join energy expert Nitin Zamre as he discusses India's evolving energy landscape with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation. The discussion highlights the ongoing reliance on coal despite a strong push for renewable energy. While coal provides domestic energy security, its use is slowly declining as India commits to cleaner sources and emission reduction targets.\n
              //     The discussion also touches upon the uneven access to 24/7 power and the decreasing cost of solar energy. Ultimately, the conversation underscores a shift towards a diversified energy mix, with a notable acceleration in electric vehicle adoption and the potential for decentralised, solar-powered solutions to empower rural communities.\n
              //     `,
              //     cta: {
              //       ctaText: "Watch video",
              //       link: "https://www.youtube.com/watch?v=q25SQpLHlDc",
              //     },
              //   },
              // },
            ],
          },
          {
            month: "Feburary",
            events: [
              {
                date: "17",
    
                dayTime: "Saturday",
                meetingType: "Internal engagement ",
                desc: "Third quarterly meeting: Brainstorming for the future",
                ctaText: "See details",
                details: {
                  date: "February 17, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/feb17_2024.png",
                      description:
                        "The Infravision Foundation Founder and Managing Trustee sharing his thoughts with other members from the Foundation family.",
                    },
                  ],
                  content: `   
                    The Infravision Foundation’s third quarterly meeting provided fascinating insights into ongoing and future projects.\n
                   Among the members of the Council of Advisers and Distinguished Fellows who attended for the first time were former Planning Commission member Arun Maira, Toyota Kirloskar Systems Chairperson Geetanjali Kirloskar, JM Financial Vice Chairman Vishal Kampani, former DG Namami Gange Rajiv Ranjan Mishra, and SBI Chief Economic Adviser Soumya Kanti Ghosh.\n
                   Many new ideas were born, and many died a quick death. A defining insight emerged: "Do not gauge your impact by what the government says but by how you impact people." This principle now guides the Foundation's approach to measuring meaningful change in India's infrastructure landscape.
                  `,
                },
              },
            ],
          },
          {
            month: "March",
            events: [
              {
                date: "22",
    
                dayTime: "Friday",
                meetingType: "External engagement ",
                desc: "High-level Roundtable on ESG ratings for infrastructure projects",
                ctaText: "See details",
                details: {
                  date: "March 22, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/march22_2024.png",
                      description:
                        "Key stakeholders engaged in discussions on sustainable infrastructure development.",
                    },
                  ],
                  content: `
                      
                    The Infravision Foundation collaborated with Envint Global to develop the S-I Rating mechanism and orchestrated a comprehensive stakeholder engagement strategy in Mumbai in collaboration with CII in the presence of 25 senior professionals. The Foundation's comprehensive research proposed a robust framework incorporating 102 Key Performance Indicators (KPI) across 15 themes, enabling objective assessment of environmental and social considerations in infrastructure projects.\n
                    The study recommends establishing a Sustainable Infrastructure Development Cell (SIDC) under NaBFID to administer and promote the adoption of these ratings. Senior executives from SBI, including Managing Director Ashwini Kumar Tewari and ESG Head Jaicy Paul, provided critical insights on how the framework will help financial institutions make informed lending decisions while managing climate risks.
    
        
                  `,
                },
              },
            ],
          },
          {
            month: "April",
            events: [],
          },
          {
            month: "May",
            events: [
              {
                date: "29",
    
                dayTime: "Saturday",
                meetingType: "Infrakatha",
                desc: "Mythology & infrastructure with Devdutt Pattanaik",
                ctaText: "See details",
                details: {
                  date: "May 29, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/june7_2024.png",
                      description:
                        "“Mythology & infrastructure” with Devdutt Pattanaik",
                    },
                  ],
                  content: `
                     Catch renowned mythologist Devdutt Pattanaik and The Infravision Foundation’s Founder and Managing Trustee Vinayak Chatterjee in the inaugural session of InfraKatha.\n
                     The discussion on the topic “Mythology & Infrastructure" evolves into an awe-inspiring journey of thoughts, facts, and perspectives. They delve into the profound connections between ancient Indian mythology and the concept of infrastructure.\n
                     Pattanaik emphasises that infrastructure is a man-made phenomenon shaped by underlying belief systems, trade, and the human need for connection. Through mythical stories and historical examples, from the Ram Setu to the ancient Harappan cities, the discussion explores the philosophical and practical aspects of building, exchanging, and coexisting, underscoring that true societal well-being stems from a mindset of "give and receive."
                  `,
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=9v61vpPmXEk",
                  },
                },
              },
              // {
              //   date: "30",
    
              //   dayTime: "Thursday",
              //   meetingType: "Virtual Conversations",
              //   desc: "Wild areas are necessary in cities, they allow nature to breathe with Anita Mani",
              //   ctaText: "See details",
              //   details: {
              //     date: "May 30, 2024",
              //     images: [ {
    
              //       image:"/assets/outreach-and-engagements/eventImages/mayImg1_30_2024.png",
              //     description:"",
              //     },{
    
              //       image:"/assets/outreach-and-engagements/eventImages/mayImg2_30_2024.png",
              //      description:"",
              //     }
              //     ],
              //     content: `
              //      Join Anita Mani, founder of Indian Pitta Books, as she converses with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, in this Infravision Conversation.\n
              //      Mani discusses the critical need for biodiversity and natural spaces within urban environments, highlighting the alarming rate at which green habitats are disappearing due to unchecked urbanisation, citing the poignant example of the Basai wetland. She advocates for allowing wild places to simply "be", rather than converting them into manicured parks or tourism complexes. The discussion also touches upon the limitations of "compensatory afforestation" and praises successful models like the Aravalli Biodiversity Park, arguing for a shift in urban planning philosophy to prioritise ecological preservation alongside development.
              //     `,
              //     cta: {
              //       ctaText: "Watch video",
              //       link: "https://www.youtube.com/watch?v=S4gStG-y7qM",
              //     },
              //   },
              // },
              // {
              //   date: "30",
    
              //   dayTime: "Thursday",
              //   meetingType: "Virtual Conversations",
              //   desc: "A walk for a cause with Gita Balakrishnan",
              //   ctaText: "See details",
              //   details: {
              //     date: "May 30, 2024",
              //     images: [ {
    
              //       image:"/assets/outreach-and-engagements/eventImages/dummy.png",
              //      description:"",
              //     },{
    
              //       image:"/assets/outreach-and-engagements/eventImages/dummy.png",
              //       description:"",
              //     }
              //     ],
              //     content: `
              //     Join Gita Balakrishnan, an architect and author, as she converses with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, in this Infravision Conversation. Balakrishnan discusses her book, "1700 in 70: A Walk for a Cause," which chronicles her 70-day, 1,700-kilometre walk from Kolkata to Delhi\n
              //     The interaction highlights Balakrishnan's motivation to experience India on foot and understand its diverse realities, particularly concerning urban design, infrastructure, and social dynamics. She discusses six key areas of focus identified during her walk, including the plight of construction workers, the need for Universal Design and design literacy, the preservation of traditional wisdom, and environmental concerns.\n
              //     The conversation also delves into Balakrishnan's remarkable resilience in overcoming personal trauma and her commitment to fostering empathy and driving policy change through her work.
              //     `,
              //     cta: {
              //       ctaText: "Watch video",
              //       link: "https://www.youtube.com/watch?v=5jrEtMe-t6c",
              //     },
              //   },
              // },
            ],
          },
          {
            month: "June",
            events: [
              {
                date: "13",
    
                dayTime: "Thursday",
                meetingType: "External engagement",
                desc: "Wastewater Reuse",
                ctaText: "See details",
                details: {
                  date: "June 13, 2024, New Delhi",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/wastewater-reuse.png",
                      description:
                        "Jagan Shah, CEO of The Infravision Foundation addressing the audience.",
                    },
                  ],
                  content: `
                     The Municipal Finance Champions Lab on Integrated Wastewater Management and Circularity convened key stakeholders across government, industry, and academia to accelerate project preparation for water reuse in Indian cities. Organised by The Infravision Foundation and The World Bank, the Lab underscored the urgent need to address urban water scarcity through innovative, finance-ready reuse projects.
                  `,
                },
              },
              {
                date: "19",
    
                dayTime: "Friday",
                meetingType: "Infrakatha",
                desc: "Inclusive infrastructure with Dr Deepa Malik",
                ctaText: "See details",
                details: {
                  date: "June 19, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/july_2024.png",
                      description: "“Inclusive infrastructure” with Deepa Malik",
                    },
                  ],
                  content: `
                     The second session of Infrakatha featured Dr Deepa Malik, para-athlete, former President of the Paralympic Committee of India, and a prominent figure in inclusive infrastructure and disability advocacy.\n
                     Learn about her incredible journey from overcoming personal health challenges to becoming a celebrated athlete and champion for accessibility in India. The discussion underlines and expands on the urgent need for inclusive infrastructure that goes beyond physical accessibility to encompass policy, mindset, and equal opportunities for all, particularly for persons with disabilities, the elderly, women, and children.
      
                  `,
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=5uzHmHzU7q0",
                  },
                },
              },
            ],
          },
          {
            month: "July",
            events: [
              {
                date: "3",
    
                dayTime: "Wednesday",
                meetingType: "External engagement",
                desc: "Infrashakti Awards: The first edition",
                ctaText: "See details",
                details: {
                  date: "July 3, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/july3_2024.png",
                      description:
                        "Ms Rumjhum Chatterjee during a panel discussion on “Sustainable infra that will build Bharat”",
                    },
                  ],
                  content: `
                      The NDTV Infra Shakti Awards 2024 is a significant initiative by The Infravision Foundation in association with NDTV, dedicated to promoting equitable and sustainable infrastructure development across India. 
                      Watch the first edition of the awards celebrate "change makers" — individuals, institutions, and projects — that have made substantial contributions to improving connectivity, livability, and sustainability within the nation's infrastructure landscape.   
                  `,
                  cta: {
                    ctaText: "Watch video",
                    link: "https://youtu.be/7nkY4yY0I-g?feature=shared",
                  },
                },
              },
    
              {
                date: "19",
    
                dayTime: "Friday",
                meetingType: "Infrakatha",
                desc: "Indian infrastructure: The difficulty of being good with Gurcharan Das",
                ctaText: "See details",
                details: {
                  date: "July 19, 2024",
                  images: [
                    {
                      description:
                        "“Indian infrastructure - The difficulty of being good” with Gurcharan Das",
                      image:
                        "/assets/outreach-and-engagements/eventImages/july26_2024.png",
                    },
                  ],
                  content: `
                     Join eminent author Gurcharan Das and “Image Guru” Dilip Cherian in this InfraKatha session as they delve into "Indian infrastructure: The difficulty of being good." They explore India's economic journey since 1991, highlighting impressive growth in services and agriculture, contrasting it with a critical failure in manufacturing.\n
                    The discussion uncovers the historical reasons for this shortfall, including the "License Raj" and bureaucratic hurdles, before examining the current government's focus on physical infrastructure. While acknowledging progress, they address challenges like poor quality infrastructure, environmental concerns, and the crucial need for job creation, especially in labour-intensive manufacturing. The conversation also touches on future scenarios, the role of AI, and more, including attitudinal changes within the bureaucracy and incentivising private sector investment through export-focused policies.
    
    
       
                  `,
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=FCDeGlsb7q0",
                  },
                },
              },
            ],
          },
          {
            month: "August",
            events: [
              {
                date: "13",
    
                dayTime: "Tuesday",
                meetingType: "External engagement",
                desc: "Land Value Capture (LVC) Lab",
                ctaText: "See details",
                details: {
                  date: "August 13, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/august1_2024.png",
                      description:
                        "Prof Sandip Chakrabarti of IIM-A addressing the participants.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/august2_2024.png",
                      description:
                        "Workshop participants exchanging greetings and salutations.",
                    },
                  ],
                  content: `
                      The Municipal Finance Champions Lab on Land Value Capture (LVC) for Public Transport Projects brought together policymakers, transit authorities, and urban planners to explore the transformative potential of LVC in funding sustainable transit infrastructure. Organised by The Infravision Foundation in collaboration with IIM Mumbai and supported by the World Bank, the Lab served as a platform to showcase successful case studies and dissect the challenges of implementing LVC in dense, complex urban environments.   
                  `,
                },
              },
              {
                date: "17",
    
                dayTime: "Saturday",
                meetingType: "Infrakatha",
                desc: "Saraswati, the lost river: Lessons for today with Sanjeev Sanyal",
                ctaText: "See details",
                details: {
                  date: "August 17, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/august22_2024.png",
                      description:
                        "“Saraswati, the lost river: Lessons for today” with Sanjeev Sanyal",
                    },
                  ],
                  content: `
                      Join economist, author, and historian Sanjeev Sanyal in this InfraKatha session alongside Vinayak Chatterjee, Founder and Managing Trustee, The Infravision Foundation. Sanyal presents compelling geological, archaeological, and textual evidence to argue for the now lost Saraswati River’s historical existence and its profound influence on ancient Indian civilisation, particularly the Harappan cities.\n
                      He highlights how ancient Indian texts frequently acknowledge a changing landscape and the impact of climate shifts, offering valuable lessons for contemporary challenges like climate change and sustainable urban planning.
    
       
                  `,
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=sygLq4cccIY",
                  },
                },
              },
            ],
          },
          {
            month: "September",
            events: [
              {
                date: "2",
    
                dayTime: "Monday",
                meetingType: "External engagement ",
                desc: "High-level roundtable on “Warehousing infrastructure as a service: Opportunities & challenges” ",
                ctaText: "See details",
                details: {
                  date: "September 2, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/september3_2024.png",
                      description:
                        "The Infravision Foundation Founder and Managing Trustee Vinayak Chatterjee addressing the audience.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/september4_2024.png",
                      description:
                        "CAIRA Governing Council Head and former Secretary, Ministry of Agriculture Siraj Hussain, in action at the roundtable.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/septemberImg2_2024.png",
                      description:
                        "United for India's agriculture: Representatives from various sectors at the recent stakeholder engagement.",
                    },
                  ],
                  content: `
                  In collaboration with the National e-Repository Limited (NeRL), The Infravision Foundation brought together key stakeholders from both public and private sectors. Participants included senior representatives from NeRL, NCDEX, NABARD, the Ministry of Consumer Affairs, Food and Public Distribution, along with banks, warehouse owners, and farmer-producer organisations — all united by the common goal of alleviating financial stress on India's agricultural community.
                  `,
                },
              },
              {
                date: "7",
    
                dayTime: "Saturday",
                meetingType: "Infrakatha",
                desc: "Heritage tourism infrastructure with Aman Nath",
                ctaText: "See details",
                details: {
                  date: "September 7, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/september17_2024.png",
                      description:
                        "“Heritage tourism infrastructure” with Aman Nath",
                    },
                  ],
                  content: `
                  Catch Aman Nath, founder of Nimrana Hotels and a renowned expert in heritage tourism, at Infrakatha. The discussion highlights the nation's often poor relationship with its rich historical sites due to a lack of investment, imaginative marketing, and a "colonised mindset." Nath advocates for a "revitalisation" approach, transforming ruined sites into experiential destinations that blend history with present-day needs.\n 
                  `,
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=u-SEobnWU6U",
                  },
                },
              },
              {
                date: "28",
    
                dayTime: "Saturday",
                meetingType: "Internal engagement",
                desc: "The Infravision Foundation half-yearly meeting 2024",
                ctaText: "See details",
                details: {
                  date: "September 28, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/sepetember1_2024.png",
                      description:
                        "Distinguished Fellow (Financial Services) Supratim Sarkar receiving the Certificate of Excellence from The Infravision Foundation Founder and CEO Vinayak Chatterjee.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/sepetember2_2024.png",
                      description:
                        "The Infravision Foundation Co-Founder Rumjhum Chatterjee, facilitating Distinguished Fellow (Public Policy) Akhilesh Tilotia.",
                    },
                  ],
                  content: `
                  Recognition and gratitude anchored The Infravision Foundation's half-yearly celebration, honouring Distinguished Fellows whose contributions advance India's infrastructure discourse. This gathering demonstrated the Foundation’s commitment to acknowledging exceptional service while charting future collaborative pathways.\n
                  Founder Vinayak Chatterjee presented certificates of excellence to Distinguished Fellows Supratim Sarkar and Akhilesh Tilotia, recognising their outstanding contributions to the Foundation’s mission. The ceremony celebrated expertise spanning banking, public policy, and cross-sector leadership.\n
                   Tilotia emphasised The Infravision Foundation's unique value proposition: "We need to support the public policy process via well-thought-out analyses and appropriate conceptual frameworks." He praised the diverse professional network, noting how multiple perspectives enable robust solution design across infrastructure challenges.\n
                   Certificates were also announced for Rajiv Ranjan Mishra for excellence in water conservation, Rajaji Meshram in transport, and Dr Soumya Kanti Ghosh in economic policy.
                  `,
                },
              },
            ],
          },
          {
            month: "October",
            events: [
              {
                date: "5",
    
                dayTime: "Monday",
                meetingType: "Infrakatha",
                desc: "Artificial Intelligence: Reshaping the digital infra landscape with Shailesh Kochhar",
                ctaText: "See details",
                details: {
                  date: "October 5, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/october14_2024.png",
                      description:
                        "AI specialist Mr Shailesh Kochhar, during his session on “Artificial Intelligence: Reshaping the digital infra landscape” at Infrakatha’s sixth edition.",
                    },
                  ],
                  content: `
                  Catch  AI specialist Shailesh Kochhar and Jagan Shah, CEO of The Infravision Foundation, in the sixth InfraKatha session as they delve into “Artificial intelligence: Reshaping the digital infrastructure landscape”. The discussion highlights AI's pervasive impact, its potential to automate global jobs, and fundamentally alter the nature of work.\n
                  From AI's current limitations to the importance of competition, it projects the profound questions AI raises for the future of labour and education. The speakers also touch upon AI's practical applications in infrastructure and its ethical considerations.\n 
                  `,
    
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=hIzp4YhZcMo",
                  },
                },
              },
            ],
          },
          {
            month: "November",
            events: [
              {
                date: "24",
    
                dayTime: "Sunday",
                meetingType: "Infrakatha",
                desc: "Indosphere: How Indian trade grew with William Dalrymple",
                ctaText: "See details",
                details: {
                  date: "November 24, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/Indosphere.png",
                      description:
                        "“Indosphere: How Indian trade grew” with William Dalrymple",
                    },
                  ],
                  content: `
                  Watch renowned historian William Dalrymple as he passionately argues for a re-evaluation of ancient India's global influence and its "Indosphere." He critiques prevailing historical narratives, particularly the "Silk Road" concept, which he believes minimises India's pivotal role in classical trade and the spread of ideas.\n
                  Dalrymple meticulously presents evidence of India's significant contributions in the diffusion of Buddhism, the economic dominance of Indian trade with the Roman Empire, and the profound impact of Indian mathematical concepts on the world.\n
                   Open yourself to a fresh perspective of India's historical soft power.
                  `,
    
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=ae8InU9IGgk",
                  },
                },
              },
            ],
          },
          {
            month: "December",
            events: [
              {
                date: "14",
    
                dayTime: "Saturday",
                meetingType: "Infrakatha",
                desc: "Can Public Private Partnerships (PPP) be revitalised? with Montek Singh Ahluwalia",
                ctaText: "See details",
                details: {
                  date: "Dec 14, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/dec14_2024.png",
                      description:
                        "“Can Public-Private Partnerships be revitalised?” with Montek Singh Ahluwalia",
                    },
                  ],
                  content: `
                  Watch Montek Singh Ahluwalia, a distinguished Indian economist and former Deputy Chairman of the Planning Commission and Vinayak Chatterjee, Founder and Managing Trustee, The Infravision Foundation, as they discuss the evolution and challenges of Public-Private Partnerships (PPPs) in India. \n
                  The discussion shares insights into the historical context of infrastructure development, the reasons for involving private capital, and the institutional and political hurdles that have impacted PPP success, such as issues with contract renegotiation, environmental clearances, and judicial intervention.
                  `,
    
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=o6nb3IejARc",
                  },
                },
              },
              {
                date: "16",
    
                dayTime: "Monday",
                meetingType: "External engagement",
                desc: "Trees Outside Forests in India (TOFI) Workshop",
                ctaText: "See details",
                details: {
                  date: "December 16, 2024",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/december1_2024.png",
                      description:
                        "Engaged participants, including Jagan Shah, CEO, The Infravision Foundation, at the TOFI Workshop.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/december2_2024.png",
                      description:
                        "Key discussions underway with participants deliberating on crucial issues.",
                    },
                  ],
                  content: `
                  A consultation workshop on “Revising building codes and evolving strategies to enhance demand for TOF-based products in India’s construction sector” under the Trees Outside Forests in India (TOFI) Program, organised by CIFOR-ICRAF in collaboration with The Infravision Foundation.\n`,
                },
              },
            ],
          },
        ],
        "2023": [
          {
            month: "January",
            events: [
              {
                date: "21",
    
                dayTime: "Saturday",
                meetingType: "Internal engagement",
                desc: "The Infravision Foundation’s first annual meeting",
                ctaText: "See details",
                details: {
                  date: "January 21, 2023",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/january_2023.jpg",
                      description:
                        "The Infravision Foundation’s first annual meeting",
                    },
                  ],
                  content: `
                      
            Along with its Council of Advisors and Distinguished Fellows, The Infravision Foundation took stock of the studies undertaken and the future direction of research and advocacy. Opinions were sought and feedback noted.\n
                  `,
                },
              },
            ],
          },
          {
            month: "Feburary",
            events: [],
          },
          {
            month: "March",
            events: [
              {
                date: "4",
    
                dayTime: "Saturday",
                meetingType: "External engagement",
                desc: "Panel discussion: The challenges ahead for core & social infra",
                ctaText: "See details",
                details: {
                  date: "Mar 4, 2023",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/march4_2023.png",
                      description:
                        "Panel discussion on “The challenges ahead for core & social infra” March 4,2023",
                    },
                  ],
                  content: `
                      
              Join a distinguished panel of experts from government, academia, industry, and finance in this panel discussion facilitated by Vinayak Chatterjee, Founder and Managing Trustee, The Infravision Foundation.\n
            Centred on the topic "The Challenges Ahead for Core & Social Infra," the panel explores the revival of Public Private Partnerships (PPP) and the successes and challenges in India's infrastructure development, particularly in roads and railways. The panellists highlight the crucial role of private sector involvement and the often-overlooked importance of social infrastructure and "the people" as a "fourth P" in successful partnerships. The discussion emphasises the need for clearer policy roadmaps, equitable risk allocation, efficient contract execution, and institutional reform to drive future growth and ensure infrastructure truly serves its beneficiaries.\n
    
                  `,
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=PX-s_58ixLk",
                  },
                },
              },
            ],
          },
          {
            month: "April",
            events: [],
          },
          {
            month: "May",
            events: [],
          },
          {
            month: "June",
            events: [],
          },
          {
            month: "July",
            events: [
              {
                date: "2 & 3",
    
                dayTime: "Sunday & Monday",
                meetingType: "Internal engagement",
                desc: "First quarterly meeting: Infrastructure investment priorities",
                ctaText: "See details",
                details: {
                  date: "July 2 and 3, 2023",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/july2and3Img1.png",
                      description:
                        "The Infravision Foundation family during an active discussion.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/july2and3Img2.png",
                      description:
                        "(From left) Jagan Shah, Ashish Dhawan, Rajnish Kumar, PK Sinha, Vinayak Chatterjee",
                    },
                  ],
                  content: `
                      
               A provocative question launched The Infravision Foundation's inaugural quarterly meeting: "Is there enough butter to spread on the infrastructure toast?" This foundational gathering examined whether social infrastructure investment has been sacrificed for core infrastructure development, sparking unprecedented policy discourse.\n
              The panel, convened by Founder and Managing Trustee Vinayak Chatterjee, revealed striking perspectives on India's infrastructure priorities and investment strategies.\n
              Diverse expert viewpoints emerged. PK Sinha highlighted budget disparities (INR 2 lakh crore in health and education versus INR 10 lakh crore in core infrastructure), while Rajnish Kumar defended prioritising core infrastructure in developing economies. Ashish Dhawan advocated higher core infrastructure investment to boost GDP and Human Development Index scores.\n
              Dynamic floor interventions enriched the debate. Amarjeet Sinha emphasised the multiplier effect of educating girls, citing East Asian success stories. Kiran Karnik posed a critical question: "Do we need more highways or i-ways?"\n
              The second day of our inaugural quarterly meeting on transformed organisational thinking through comprehensive realignment and refinement.
                  `,
                  cta: {
                    ctaText: "Watch video",
                    link: "https://www.youtube.com/watch?v=-INuUJJwYdk",
                  },
                },
              },
            ],
          },
          {
            month: "August",
            events: [
              //   {
              //     date: "27",
              //     dayTime: "Sunday",
              //     meetingType: "Virtual Conversations",
              //     desc: "Selecting the appropriate urban transport system for India's cities with Prof Geetam Tiwari",
              //     ctaText: "See details",
              //     details: {
              //       date: "August 27, 2023",
              //       images: [
              //         {
              //           image:
              //           "/assets/outreach-and-engagements/eventImages/aug27_2023.png",
              //           description:""
              //         }
              //         ,
              //       ],
              //       content: `
              //  Watch a transportation expert’s perspective as Professor Geetam Tiwari engages in a discussion focused on “Selecting the appropriate urban transport system for India's cities”, particularly Delhi with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation. Tiwari argues that metro is not the only solution for urban mobility. shes emphasises the need for a holistic and integrated approach that considers diverse travel demands, highlighting Delhi's decline in public transport ridership despite significant investment.\n
              // The expert stresses the importance of government commitment to providing safe, reliable public transport and infrastructure for active travel, advocating for a shift in mindset from private to public assets, and the establishment of overarching institutional mechanisms to plan and integrate different transport modes based on actual city travel patterns.\n
              //       `,
              //       cta: {
              //         ctaText: "Watch Video",
              //         link: "https://www.youtube.com/watch?v=Sr17ZN7FLA4",
              //       },
              //     },
              //   },
            ],
          },
          {
            month: "September",
            events: [
              {
                date: "18",
    
                dayTime: "Monday",
                meetingType: "External engagement",
                desc: "High-level Roundtable: Interactive session on Surety Bonds with Debasish Panda, Chairman, IRDAI",
                ctaText: "See details",
                details: {
                  date: "September 18, 2023",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/sept18_2023.png",
                      description:
                        "Debasish Panda, Chairman of the Insurance Regulatory and Development Authority of India (IRDAI), speaking at the roundtable on Surety Bonds organised by the CII under the auspices of The Infravision Foundation.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/sep2023.png",
                      description: "The panel in action at the roundtable.",
                    },
                  ],
                  content: `
                      
                The Infravision Foundation and Confederation of Indian Industry (CII) organised a roundtable in which the Foundation presented its research, developed in collaboration with the SP Jain Institute of Management and Research.\n
               Presented by Distinguished Fellow Supratim Sarkar, the research outlined key recommendations for effective surety bond implementation. With India's National Infrastructure Pipeline (NIP) requiring INR 100 lakh crore investment over five years, the discussions revealed that banks lack capacity for traditional guarantees, positioning surety bonds as an essential complement. IRDAI Chairman Debasish Panda emphasised the regulatory framework's readiness, noting recent guidelines that opened the sector and removed business restrictions.\n
               
                  `,
                },
              },
              // {
              //   date: "15",
    
              //   dayTime: "Friday",
              //   meetingType: "Virtual Conversations",
              //   desc: "Sustainability ratings: An idea whose time has come with Rajaji Meshram",
              //   ctaText: "See details",
              //   details: {
              //     date: "Sep 15, 2023",
              //     images: [
              //       {
              //         image:
              //         "/assets/outreach-and-engagements/eventImages/sep15_2023.png",
              //         description:""
              //       }
              //       ,
              //     ],
              //     content: `
    
              // Join Rajaji, a transport and logistics expert and Distinguished Fellow at The Infravision Foundation, as he shares his thoughts on the critical need for Sustainability Ratings for infrastructure projects in India. Rajaji explains that as India aims for significant economic growth and a "step jump in infrastructure," this growth must be sustainable and not at the environment's or society's expense. The core idea is to implement a standardised rating system, similar to financial credit ratings, that would simplify the assessment of a project's environmental, social, and long-term climate impact.\n
              //  The discussion also highlights the importance of systematic processes, building trust in the ratings, and securing buy-in from key stakeholders like the government and financial institutions to ensure the successful adoption and effectiveness of these sustainability ratings.\n
              //     `,
              //     cta: {
              //       ctaText: "Watch Video",
              //       link: "https://www.youtube.com/watch?v=Jis2Q7oOfr0&t=1s",
              //     },
              //   },
              // },
            ],
          },
          {
            month: "October",
            events: [
              {
                date: "7",
    
                dayTime: "Saturday",
                meetingType: "Internal engagement",
                desc: "Second quarterly meeting: Ideas aplenty",
                ctaText: "See details",
                details: {
                  date: "October 7, 2023",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/oct7_2023.png",
                      description:
                        "The Infravision Foundation Founder and Managing Trustee Vinayak Chatterjee, with Advisory Council members Arun Nanda, P. K. Sinha, and Rajnish Kumar.",
                    },
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/oct7_2023.jpeg",
                      description:
                        "The Infravision Foundation family amid a discussion.",
                    },
                  ],
                  content: `
                      
                  The Infravision Foundation transformed ambition into actionable roadmaps during an intensive ideas marathon that redefined our trajectory. This session brought together the Council of Advisors and Distinguished Fellows to crystallise the Foundation’s evolving mission and operational framework.\n
                 The meeting established ambitious institutional benchmarks: positioning The Infravision Foundation among India's most respected infrastructure policy destinations, with a strategic balance of 40% constituting intellectual output and 60% advocacy work. Many suggestions were made and accepted with alacrity.\n
                 A pivotal discussion between Distinguished Fellow Jagan Shah and World Bank expert Bhavna Bhatia explored two critical focus areas — energy and urban infrastructure — generating actionable insights for future initiatives.\n
                 Key participants included Trustee PK Sinha, Advisory Council members Arun Nanda, Sunil Mathur, Ashish Dhawan, DK Sen, Rajnish Kumar, Dilip Cherian, and G Raghuram, alongside Distinguished Fellows Supratim Sarkar, Rajaji Meshram, and Shah.
                  `,
                },
              },
              //       {
              //         date: "11",
    
              //         dayTime: "Wednesday",
              //         meetingType: "Virtual Conversations",
              //         desc: "Making metro systems financially viable with Prof Sandip Chakrabarti",
              //         ctaText: "See details",
              //         details: {
              //           date: "Oct 11, 2023",
              //           images: [
              //             {
              //               image:
              //               "/assets/outreach-and-engagements/eventImages/oct11_2023.png",
              //             description:""
              //             }
              //             ,
              //           ],
              //           content: `
    
              //   Most metro systems, especially in smaller Indian cities, are not financially viable due to low ridership, insufficient fare revenues, and a lack of non-fare income. Watch Professor Sandip Chakrabarti from IIM-Ahmedabad share his thoughts and insights on the financial sustainability of India's Metro systems. The core issue discussed is that\n
              //  Professor Chakrabarti advocates for a comprehensive, integrated approach to urban transportation through the concept of "AMTA 2.0," which envisions a single entity responsible for planning, owning, building, operating, and setting policy for all modes of public transit in a city, including innovative funding mechanisms like land value capture and congestion pricing.\n
              // The overall purpose is to encourage a shift towards sustainable, financially healthy urban mobility by making beneficiaries pay and fostering a strategic vision for integrated public transport.
    
              //           `,
              //           cta: {
              //             ctaText: "Watch Video",
              //             link: "https://www.youtube.com/watch?v=H34LNACsKZw&t=51s",
              //           },
              //         },
              //       },
              //           {
              //             date: "11",
    
              //             dayTime: "Wednesday",
              //             meetingType: "Virtual Conversations",
              //             desc: "How to save our hill cities with Rajiv Ranjan Mishra",
              //             ctaText: "See details",
              //             details: {
              //               date: "Oct 11, 2023",
              //               images: [
              //                   {
    
              //                     image:"/assets/outreach-and-engagements/eventImages/octImg2_11_2023.png",
              //                 description:""
              //                   }
    
              //               ],
              //               content: `
    
              //    Rajiv Ranjan Mishra - Distinguished Fellow, The Infravision Foundation, and former Director General, National Mission for Clean Ganga.\n
              //  Join Rajiv Ranjan Mishra, former Director General of the National Mission for Clean Ganga and Distinguished Fellow, The Infravision Foundation, as he converses with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation. The discussion focuses on the carrying capacity of Himalayan hill cities in India, emphasising the urgent need to assess and manage human impact on these fragile ecosystems due to recent environmental damage. Mishra talks about the multidimensional nature of carrying capacity, encompassing resource availability, environmental assimilation, and infrastructure, and the necessity of integrating ecological sensitivity into urban planning. \n
              //    The conversation also highlights the challenges of implementation across diverse states and the critical role of capacity building for city managers and regional planning to foster sustainable development in these vital regions.
    
              //               `,
              //               cta: {
              //                 ctaText: "Watch video",
              //                 link: "https://www.youtube.com/watch?v=ZdLcdjJShW8",
              //               },
              //             },
              //           },
            ],
          },
          {
            month: "November",
            events: [
              //     {
              //       date: "14",
              //       dayTime: "Tuesday",
              //       meetingType: "Virtual Conversations",
              //       desc: "Air pollution: The solution has to be multi-sectoral",
              //       ctaText: "See details",
              //       details: {
              //         date: "November 14, 2023",
              //         images: [
              //           {
              //             image:
              //             "/assets/outreach-and-engagements/eventImages/nov14_2023.png",
              //           description:""
              //           }
              //           ,
              //         ],
              //         content: `
              // Join Jagan Shah, urban planning expert and CEO of The Infravision Foundation, alongside Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, in this episode of the Infravision Conversation.\n
              // The discussion addresses air pollution as a critical human development issue with far-reaching consequences, extending beyond immediate health impacts to long-term societal and economic burdens. They emphasise air pollution as a complex outcome of current development models, with significant contributors including construction dust, vehicular emissions, and solid waste.\n
              // Drawing inspiration from London's successful long-term efforts to combat smog through a dedicated metropolitan agency, Shah argues for a multi-sectoral, national approach to solutions. He highlights the inadequacy of isolated, reactive measures and advocates for proactive strategies involving various government ministries and public consensus.
              //         `,
              //         cta: {
              //           ctaText: "Watch video",
              //           link: "https://www.youtube.com/watch?v=OjrOlknqzu4",
              //         },
              //       },
              //     },
            ],
          },
          {
            month: "December",
            events: [
              {
                date: "4",
    
                dayTime: "Monday",
                meetingType: "External engagement ",
                desc: "High-level Roundtable on Urban mobility: Towards seamless integration",
                ctaText: "See details",
                details: {
                  date: "December 4, 2023",
                  images: [
                    {
                      image:
                        "/assets/outreach-and-engagements/eventImages/dec4_2023.png",
                      description:
                        "The Infravision Foundation CEO Jagan Shah, along with speakers Rana Amani, Rahul Nilosey, Palash Srivastava, Tushar Arora, and Sandip Chakrabarti, at the conference.",
                    },
                  ],
                  content: `
                      
                  Partnering with the Confederation of Indian Industry (CII), The Infravision Foundation convened "Urban mobility: Towards seamless integration", bringing together policymakers, academics, technology providers, and metro operators.\n
                 The conference examined two critical knowledge papers developed with IIT Delhi's Prof Geetam Tiwari and IIM Ahmedabad's Prof Sandip Chakrabarti, analysing appropriate urban transport systems and metro financial sustainability. Twenty-two speakers over six hours delivered comprehensive insights, revealing that most metros face insufficient ridership and financial unsustainability.
                  `,
                },
              },
            ],
          },
        ],
      }}
    
  }

  // Handler to get the primary engagement (most recent upcoming one)
  async primaryEngagement() {
    // Fetch all engagements
    const all = await this.allEngagements();

    // Get current date (set time to 00:00:00 for comparison)
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let soonestEvent: any = null;
    let soonestDate: Date | null = null;

    // Helper to parse a date string robustly
    function parseEventDate(event: any, month: string, year: string): Date | null {
      // Try details.date first
      if (event.details && event.details.date) {
        const d = new Date(event.details.date);
        if (!isNaN(d.getTime())) return d;
      }
      // Try to construct from event.date, month, year
      if (event.date && month && year) {
        // event.date might be "4" or "04", so ensure it's a number
        const dateStr = `${month} ${event.date}, ${year}`;
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) return d;
      }
      return null;
    }

    // Loop through all years, months, and events
    for (const year of Object.keys(all.data)) {
      const months = all.data[year];
      for (const monthObj of months) {
        const month = monthObj.month;
        for (const event of monthObj.events) {
          const eventDate = parseEventDate(event, month, year);
          if (eventDate && eventDate >= now) {
            if (!soonestDate || eventDate < soonestDate) {
              soonestDate = eventDate;
              soonestEvent = event;
            }
          }
        }
      }
    }

    // If no upcoming event, try to return the most recent past event
    if (!soonestEvent) {
      let latestPastEvent: any = null;
      let latestPastDate: Date | null = null;
      for (const year of Object.keys(all.data)) {
        const months = all.data[year];
        for (const monthObj of months) {
          const month = monthObj.month;
          for (const event of monthObj.events) {
            const eventDate = parseEventDate(event, month, year);
            if (eventDate && eventDate < now) {
              if (!latestPastDate || eventDate > latestPastDate) {
                latestPastDate = eventDate;
                latestPastEvent = event;
              }
            }
          }
        }
      }
      if (latestPastEvent) {
        return latestPastEvent;
      }
      return null;
    }

    return soonestEvent;
  }
}
