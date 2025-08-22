import { Injectable } from '@nestjs/common';

export interface Patron {
  id: number;
  name: string;
  title: string;
  organization?: string;
  bio: string;
  imageUrl: string;
  order: number;
}

@Injectable()
export class PatronsService {
  /**
   * Get all patrons
   * @returns Static patrons data
   */
  async getPatrons() {
    const patrons: any[] = [
      {
        image: "/assets/home/advisory/AshishDhawan.jpg",
        title: "Ashish Dhawan",
        desig: "Founder-CEO, The Convergence Foundation",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/ashish-dhawan-241112",
        socialMedia: "linkedin",
        popupdesc: `Ashish Dhawan is the Founder-CEO of The Convergence Foundation (TCF), which focuses on accelerating India's economic growth and development. TCF incubates non-profits focused on creating system-wide impact in the areas of economic growth, equality of opportunity, and sustainability. Its current portfolio includes organisations working on jobs and investment, the rule of law, governance and state capacity, economic empowerment of women, science and technology, air pollution, unlocking philanthropic capital, and improving the effectiveness of non-profits.\n
    
    He is also the Founding Chairperson of Ashoka University and Central Square Foundation. Ashoka University, established as a university in 2014, is recognised as a leading teaching and research institute across the humanities, social sciences, natural sciences, and data & computer science. Central Square Foundation has been a leading voice for foundational literacy and numeracy in India and currently supports several state governments in improving learning outcomes in the early grades.\n
    
    Mr Dhawan also serves on the governing board of the Bill and Melinda Gates Foundation (BMGF). Before his second career as a philanthropist, he was among India's successful private equity investors. He founded and ran ChrysCapital, a leading private equity firm in the country.\n
    
    He graduated from Yale University and received his MBA from Harvard Business School.
    
        `,
      },
      {
        image: "/assets/home/advisory/NarotamSekhsaria.jpg",
        title: "Narotam Sekhsaria",
        desig: "Chairman Emeritus, Ambuja Cements Ltd; Chairman, Narotam Sekhsaria Foundation; Chairman, Ambuja Foundation",
        popupImg: "/assets/home/trustees/vinayakImg.png",
    
        popupdesc: `
        Narotam Sekhsaria, Chairman of Ambuja Cements Ltd and Chairman of ACC Ltd, is a prominent figure in the Indian cement industry. He introduced new standards in manufacturing, management, marketing efficiency, and corporate social responsibility to an industry he helped transform.\n
    
    A first-generation industrialist, Mr Sekhsaria completed his Bachelor's in Chemical Engineering with honours and distinction from the University of Bombay. He was the principal founder-promoter of Ambuja Cement, and its Chief Executive and Managing Director from its inception in April 1983 until January 2006. He is currently the non-executive Chairman of the company.\n
    
    He built Ambuja Cement into a highly efficient and profitable cement company in India. He also redefined industry practices by turning cement from a commodity into a brand, bringing cement plants closer to cement markets, and linking plants to lucrative coastal markets by setting up ports and a fleet of bulk cement ships for the first time in India. During his tenure as Managing Director from inception until 2006, the company grew from 0.7 million tonne capacity to 22 million tonnes, expanding from one location to a pan-India company which set the benchmark for the cement industry across every significant business parameter.\n
    
    In 1999, Ambuja Cement made a strategic investment in ACC, India's oldest and most prestigious cement company, by acquiring approximately 14.5% stake. Mr Sekhsaria was appointed Vice-chairman of the company. Under his leadership, ACC entered a new growth trajectory and achieved significant improvements in project management, logistics, and overall cost-competitiveness. Mr Sekhsaria has been the non-executive Chairman of the company since 2006.\n
    
    He currently holds Board positions as Chairman of Narotam Sekhsaria Foundation and Ambuja Cement Foundation. He is a Board Member in the Governing Council of the Indian Institute of Crafts & Design, Jaipur, and is Director of the Ambuja Educational Institute. Previously, he served as a Trustee on the Board of UTI (1993-2001), as the Vice Chairman of GRUH Finance Ltd (a co-investment of Ambuja Cement with HDFC), and was also on the Board of Governors of the Indian Institute of Technology (IIT) Kharagpur.
     
         `,
      },
    {
      image: "/assets/home/advisory/HemendraMKothari.jpg",
      title: "Hemendra M. Kothari",
      desig: "Chairman, DSP Investment Managers Pvt Ltd",
      popupImg: "/assets/home/trustees/vinayakImg.png",
  
      popupdesc: `
      Hemendra Kothari represents the fourth generation of a family of prominent stockbrokers and is the ex-President of the Bombay Stock Exchange. He has over 50 years of experience in the financial services industry.\n
  
  He is currently the Chairman of DSP Investment Managers Pvt Ltd, one of the leading asset management companies in India, which was in a decade-long joint venture with BlackRock. He also served as Chairman of DSP Merrill Lynch, a joint venture with Merrill Lynch, until his retirement in 2009.\n
  
  Mr Kothari is a Member of the Governing Council of the National Investment and Infrastructure Fund (NIIF), which was created by the Government of India to maximise economic impact through infrastructure development. He has also served as a member on various boards and committees, including The National Institute of Securities Market (NISM), set up by the Securities and Exchange Board of India (SEBI); the Corporatisation and Demutualization of Stock Exchanges Committee; Infrastructure Financing, Department of Economic Affairs (Infrastructure), Ministry of Finance; and the Standing Committee on Money Markets, Reserve Bank of India. He currently serves on the Investment Advisory Committee of the Army Group Insurance Fund.\n
  
  He was a Member of the Indo-UK Roundtable, which was established by the British Foreign and Commonwealth Office and the Ministry of External Affairs, Government of India. He is currently a Member of the India-UK Financial Partnership (IUKFP).\n
  
  Mr Kothari is the Founder, Chairman and Managing Trustee of the Wildlife Conservation Trust (WCT), a non-religious and non-political, not-for-profit trust that endeavours to strengthen the protection of forest ecosystems and mitigate climate change. He is also one of the largest individual donors in wildlife and environmental conservation in India. He is a Member of the State Board for Wildlife of Rajasthan, under the Chairmanship of the Chief Minister. He also served as a Member of the State Board of Maharashtra. He serves as the India Chairman of The Nature Conservancy (TNC), the largest environmental organisation in the world. He has served as a Member of The Energy and Resources Institute (TERI) Governing Council. He founded the Hemendra Kothari Foundation (HKF), a philanthropic organisation which assists other NGOs, particularly in the areas of education, healthcare, art, culture, heritage, and sports.
  `,
    },
    {
      image: "/assets/home/advisory/JanmejayaKSinha.jpg",
      title: "Dr Janmejaya K. Sinha",
      desig: "Chairman India, Boston Consulting Group",
      popupImg: "/assets/home/trustees/vinayakImg.png",
      link: "https://www.linkedin.com/in/janmejaya-sinha-591259120",
      socialMedia: "linkedin",
      popupdesc: `Dr Janmejaya Sinha is Chairman of BCG's India Practice and also a BCG Fellow researching Family Businesses. He is a member of The Boston Consulting Group’s Henderson Institute Innovation Sounding Board, dedicated to supporting, inspiring, and guiding upstream innovation at BCG. He previously served as Chairman of the Asia-Pacific region between 2009 and 2018 and as a member of the firm's Executive Committee between 2006 and 2018.\n
  
  He possesses deep expertise in managing conflict in family-owned businesses. He has worked extensively with clients worldwide on a range of issues encompassing large-scale organisation transformation, strategy, governance, family business matters, and operations turnaround.\n
  
  Dr Sinha has been a member of various committees set up by the Government of India, Reserve Bank of India (RBI), and Indian Banks' Association (IBA). He chairs the Confederation of Indian Industry's (CII) Committee on Financial Inclusion and Fintech. He was also a member of the Committee of Chief Ministers on the adoption of Digital Payments.
  \n
  
  He writes extensively in the press and is a regular speaker at the WEF, CII, IBA, FICCI, RBI, and other media events. He is the co-author of the books titled “Untangling Conflict: An Introspective Guide for Families in Business” published by Penguin and "Your Strategy Needs a Strategy", published by Harvard Business Review Press. He has also co-edited the book titled "Own The Future", published by Wiley. In 2010, Consulting Magazine named him one of the Top 25 most influential consultants in the world.
  \n
  
  Before joining The Boston Consulting Group, he worked with the Reserve Bank of India for several years across different departments. He has also worked briefly for the World Bank.
  \n
  
  Dr Sinha holds a PhD from the Woodrow Wilson School of Public and International Affairs, Princeton University, the US; a BA and an MA in Economics from Clare College, Cambridge University, the UK; and a BA and an MA in History from St Stephen’s College, Delhi University, India.
  
  `,
    },
    {
      image: "/assets/home/advisory/SNSubrahmanyan.jpg",
      title: "S. N. Subrahmanyan",
      desig: "S N Subrahmanyan, Chairman & Managing Director, Larsen & Toubro",
      popupImg: "/assets/home/trustees/vinayakImg.png",
      popupdesc: `
       
  S N Subrahmanyan (SNS) is the Chairman & Managing Director of Larsen & Toubro, a multi-billion-dollar conglomerate. He also holds diverse leadership positions as Chairperson of L&T Finance Holdings Ltd and Chairman of LTIMindtree, L&T Technology Services, and L&T Metro Rail (Hyderabad) Ltd.\n
  
  Hailing from Chennai, SNS embarked on his professional journey with L&T as a Project Planning Engineer in 1984. He holds a degree in civil engineering from the National Institute of Technology, Kurukshetra, and a postgraduate degree in business management from Symbiosis Institute of Business Management, Pune. He furthered his education with an Executive Management Programme from the London Business School.\n
  
  Under his leadership, L&T has been recognised as one of Asia’s Most Honoured Companies by Institutional Investor and the Company of the Year by Business Standard in 2020. It has also been listed among the world's best employers on Forbes' list and as one of India’s Best Employers among Nation-Builders in 2023 by the Great Place to Work (GPTW) institute. SNS received the Eminent Engineer award from the Engineering Council of India in 2024.\n
  
  He has been featured on the cover of Fortune magazine’s October 2023 edition as India’s Best CEO. He is also the winner in the Infrastructure & Engineering category of the Business Today-PwC India’s Best CEOs ranking in March 2022, was ranked 8th in the Construction Week Power 100 Ranking for 2022, and was honoured as the Infrastructure Person of the Year in 2012. In 2020, he achieved the Top CEO (Sell Side) and the 3rd Best CEO (Overall) in the All-Asia Executive Team Survey conducted by Institutional Investor and was recognised as the CEO of the Year by the leading Indian news channel, CNBC-Awaaz. His leadership was also recognised with the Emergent CEO Award in 2019, and he received the Leading Engineering Personality award from the Institution of Engineers (India) in 2014.\n
  
  SNS serves as one of the nine founding members of the Climate Finance Leadership Initiative (CFLI) India, actively contributing to bringing global scale and influence to this initiative. Additionally, he serves as the honorary chairperson of the Board of Governors at the National Institute of Technology-Rourkela. In February 2021, he was appointed by the Union Ministry of Labour & Employment as the Chairman of the National Safety Council for two years.
  
       `,
    },
    {
      image: "/assets/home/advisory/SameerGupta.jpg",
      title: "Sameer Gupta",
      desig: "Chairman & Managing Director, Jakson Group",
      popupImg: "/assets/home/trustees/vinayakImg.png",
      link: "https://www.linkedin.com/in/sameer-gupta-jakson",
      socialMedia: "linkedin",
      popupdesc: `
  Sameer Gupta is Chairman and Managing Director of Jakson Group — India’s leading energy and infrastructure company specialising in distributed energy, solar, and EPC solutions. The business interests of Jakson span multiple lines, including generating set manufacturing, solar module manufacturing, solar off-grid products, hybrid solutions, battery-based energy storage systems, solar rooftops, solar land-based EPC, electrical EPC in areas of substation, transmission & distribution, and defence solutions. Jakson also has business interests in civil infrastructure in India, real estate in the UK, and hospitality.\n
  
  Mr Gupta is currently Chairman of the Skill Council of Green Jobs, a Government of India initiative. He has served as Chairman of the Confederation of Indian Industry (CII) Northern Region and continues to be actively involved in various Councils & Committees of CII.\n
  
  He is a graduate in Electronics Engineering from Pune University and an alumnus of Harvard Business School.
  
      `,
    },
    {
      image: "/assets/home/advisory/GeetanjaliKirloskar.jpg",
      title: "Geetanjali Vikram Kirloskar",
      desig: "Chairperson and MD, Kirloskar Systems Pvt Ltd; Chairperson, Toyota Tsusho Insurance Broker Pvt Ltd",
      link: "https://www.linkedin.com/in/geetanjali-kirloskar-b04203154/",
      socialMedia: "linkedin",
      popupImg: "/assets/home/trustees/vinayakImg.png",
      popupdesc: `
       Geetanjali Vikram Kirloskar is Chairperson and MD of Kirloskar Systems and Chairperson of Toyota Tsusho Insurance Broker Pvt Ltd. She is recognised as a thought leader and entrepreneur with experience across sectors.\n
  
  
  She served on the Board of the India Brand Equity Fund of the Commerce Ministry and as Co-Chairperson of FICCI India Japan Business Council. From 2020 to 2023, she was Chairperson of the Healthcare CSR Committee of the Government of Karnataka, during which time she worked to build a modular 100-bed Covid shelter in 45 days.\n
  
  Among other initiatives, Ms Kirloskar established the Sakra World Hospital in a joint venture with Toyota Tsusho and Secom Japan, an insurance brokerage business with Toyota Tsusho, and a joint venture with the Embassy Group for real estate.\n
  
  As Honorary Consul for Finland in Karnataka, she was awarded a Knighthood from the Government of Finland for her significant contribution to India-Finland ties.
  
  
  
       `,
    },
    {
      image: "/assets/home/advisory/VishalKampani.jpg",
      title: "Vishal Kampani",
      desig: "Vice Chairman and Managing Director, JM Financial Ltd",
      link: "https://www.linkedin.com/in/vishal-kampani-0a94942a6/",
      socialMedia: "linkedin",
      popupImg: "/assets/home/trustees/vinayakImg.png",
      popupdesc: `
        
  Vishal Kampani is the non-executive Vice-Chairman of JM Financial Limited, the Group’s flagship listed company. He has been instrumental in transforming the JM Financial Group into a prominent financial services powerhouse. He launched the Asset Reconstruction Business in 2008 and the Real Estate Finance Business in 2009.\n
  
  Mr Kampani joined the JM Financial Group in 1997 as an analyst in the Merchant Banking Division and has since progressed through various roles, working across businesses within the Group. In a career spanning over 22 years, he has played a key role in consummating several landmark and complex M&A and restructuring transactions. He has been instrumental in expanding the company’s international operations and establishing a global presence.\n
  
  In 1999, Mr Kampani worked with Morgan Stanley Dean Witter & Co. in New York, in the Equity Capital Markets Group, where he was involved in structuring products for the firm’s clients, most of whom were Fortune 500 companies. After returning to India in 2000, he worked as a Senior Banker in the Investment Banking Division of JM Morgan Stanley Pvt Ltd, which was then a joint venture between JM Financial Group and Morgan Stanley. He was responsible for building and maintaining client relationships, procuring and overseeing the execution of transactions, advising corporate clients in raising capital, acquisition and divestment of companies, and reorganisation of corporate groups. He was also the head of the corporate finance division.\n
  
  Mr Kampani holds a Master of Commerce from the University of Mumbai and has completed his MS (Finance) from London Business School, University of London.
  
        `,
    },
    {
      image: "/assets/home/advisory/KhurshedDaruvala.jpg",
      title: "Khurshed Daruvala",
      desig: "Chairman, Sterling and Wilson Group",
      link: "https://www.linkedin.com/in/khurshed-daruvala/",
      socialMedia: "linkedin",
      popupImg: "/assets/home/trustees/vinayakImg.png",
      popupdesc: `
      Khurshed Daruvala, Chairman of Sterling and Wilson Group (S&W), has significantly contributed to the company’s growth and expansion by blending traditional values with a contemporary business approach. As the catalyst behind the company’s evolution into a prominent global powerhouse with diverse businesses across verticals, Mr Daruvala has led from the front since he joined Sterling and Wilson in 1997.\n
  
  He is credited with driving S&W’s emergence as India’s leading MEP (Mechanical, Electrical, and Public Health Engineering) and Renewable Energy solutions provider. Mr Daruvala was instrumental in introducing Solar EPC in 2011, a segment he believed had significant growth potential. This decision transformed S&W’s trajectory and accelerated the company’s growth.\n
  
  A Chartered Accountant by qualification, he has made Sterling and Wilson one of India’s leading companies in the EPC sector. Today, S&W has established a strong global reputation. He has spent the past two decades building a rapidly growing business empire, taking the company’s turnover from USD 1 million in 1997 to approximately USD 1 billion for the year ending 2021, and expanding the team from fewer than 100 to approximately 4,000 skilled professionals.\n
  
  Under his leadership, S&W has diversified into several emerging segments such as turnkey data centres, transmission & distribution, diesel generators, and E-Mobility, and established a footprint in over 30 countries spread across India, the Middle East, Africa, Southeast Asia, Australia, Europe, and the Americas.\n
  
  Mr Daruvala holds a bachelor’s degree in commerce from the University of Mumbai and is an Associate Member of the Institute of Chartered Accountants of India (ICAI). He has been part of the Sterling and Wilson Group for approximately 28 years and has been on the board of Sterling and Wilson Renewable Energy Limited since 25 April 2018.	
      `,
    },
  ];

    return {
      patrons,
      totalCount: patrons.length,
      lastUpdated: new Date().toISOString()
    };
  }
}
