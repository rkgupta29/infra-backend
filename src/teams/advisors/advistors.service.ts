import { Injectable } from '@nestjs/common';


@Injectable()
export class AdvisorsService {
  /**
   * Get all patrons
   * @returns Static patrons data
   */
  async getAdvisors() {
    const advisors: any[] = [
      {
        image: "/assets/home/advisory/NasserMunjee.jpg",
        title: "Nasser Munjee",
        desig: "Chairman, Aga Khan Foundation (India)",
        link: "https://www.linkedin.com/in/nasser-munjee-8aaa5316/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
    
        popupdesc: `
          Naseer Munjee was educated at Cambridge and the London School of Economics in the UK, and the University of Chicago in the US. His career has focused on the creation of financial institutions in India and addressing development challenges in emerging economies.\n
    
    He was instrumental in establishing Housing Development Finance Corporation (HDFC), India's first mortgage company, where he served for twenty years, rising to Executive Director. At the request of the HDFC Chairman, he then founded Infrastructure Development Finance Company, a joint partnership with government and domestic and international institutions, which he led as Managing Director and CEO for seven years.\n
    
    Mr Munjee currently serves on the Boards of ten public companies in India, including Cummins India Limited, Ambuja Cements Limited (Holcim Group), Tata Motor Finance Ltd (where he is Group Chairman), and The Indian Hotels Company Limited. Internationally, his board appointments include Jaguar Land Rover Plc, UK Greenko, Mauritius, and Adsum Capital Ltd, Dubai. He is also a member of the Advisory Group of the City of London and the Executive Committee of the World Islamic Economic Forum.\n
    
    His extensive institutional involvement includes chairing the Aga Khan Foundation (India), the Aga Khan Rural Support Programme (India), and Global Infrasys Limited. He is also a member of the Advisory Board of the South Asian Centre, London School of Economics, and the Bombay City Policy and Research Foundation (Bombay Chamber of Commerce). Previously, he served as a Board member or Trustee for institutions such as Welham Boys School, the Indian Institute for Human Settlements (Life Trustee), Charles Correa Urban Foundation, Currimbhoy Orphanage, the Advisory Board of the Schulich School of Management (University of Toronto), CanCare Trust, Miracle Feet, and Sommerville College, Oxford India Centre.\n
    
    Mr Munjee has provided consultancy services in housing finance to the Asian Development Bank, the World Bank, the UNCDF (United Nations Capital Development Fund), and the UN (Habitat) in Sri Lanka, Bhutan, Ethiopia, Thailand, and Indonesia.
    
          `,
      },
    
      {
        image: "/assets/home/advisory/RajnishKumar.jpg",
        title: "Rajnish Kumar",
        desig: "Former chairman, State Bank of India",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://in.linkedin.com/in/rajnish-kumar-0a1663bb",
        socialMedia: "linkedin",
        popupdesc: `
         Rajnish Kumar is the former Chairman of the State Bank of India, completing his three-year term in October 2020. He is credited with steering the bank successfully through challenging times. During his tenure, SBI developed YONO, a digital platform that established the bank as a global leader in the adoption of technology and innovation.\n
    
    Mr Kumar is a career banker with nearly four decades of service with the State Bank of India. His expertise in corporate credit and project finance is well recognised. He served the bank in various capacities across the country, including in the North-East as Chief General Manager. He successfully managed the UK operations of the bank immediately after the crisis caused by the collapse of Lehman Brothers. Earlier, he worked as Vice President (Credit) in Toronto.\n
    
    Mr Kumar was also the Chairman of SBI's subsidiaries, notably SBI Life Insurance Company Limited, SBI Foundation, SBI Capital Markets Limited, and SBI Cards & Payments Services Limited. He also served as Director on the boards of various organisations, including Export-Import Bank of India, Institute of Banking Personnel Selection, National Institute of Bank Management, Pune, Indian Banks' Association, Khadi & Village Industries Commission, and Indian Institute of Banking & Finance, among others.\n
    
    He is currently serving as an independent director on the Boards of many prestigious companies, such as HSBC, Asia Pacific and L&T Infotech. He is also Non-Executive Chairman of Resilient Innovations Pvt Ltd (BharatPe), one of the fastest-growing Fintech companies in the country, and an independent director on the Board of Lighthouse Communities Foundation. Mr Kumar is also an advisor to Kotaik Investment Advisors Ltd and Barings Private Equity Asia Ltd, apart from being a Member of the Board of Governors, Management Development Institute, Gurugram.\n
    
    Born in January 1958, Mr Kumar holds an MSc in Physics from Meerut University and is a Certified Associate of the Indian Institute of Bankers (CAIIB). Mr Kumar is an avid traveller and has visited several countries.
    
         `,
      },
      {
        image: "/assets/home/advisory/ProfessorGRaghuram.jpg",
        title: "Professor G. Raghuram",
        desig: "Former Director, IIM Bangalore; Former Dean, IIM Ahmedabad",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/g-raghuram-aa103750/",
        socialMedia: "linkedin",
        popupdesc: `
          Professor Raghuram is Principal Academic Advisor and Distinguished Visiting Faculty at the National Rail and Transportation Institute, a university promoted by the Indian Ministry of Railways. He is Professor (Emeritus) at the Gujarat Maritime University, a university promoted by the Gujarat Maritime Board. He was Director, IIM Bangalore, from February 2017 to July 2020.\n
    
    Earlier, he served as Professor and Chairperson of the Public Systems Group at IIMA. He has been Dean (Faculty), IIMA, Vice-Chancellor of the Indian Maritime University, and held the Indian Railways Chair Professor at IIMA.\n
    
    Professor Raghuram received a PhD from Northwestern University, USA (1984); a postgraduate Diploma in Management from IIM, Ahmedabad (1978); and a BTech from IIT, Madras (1976). He specialises in infrastructure and transport systems, logistics and supply chain management. His research focuses on the railway, port, shipping, aviation, and road sectors.\n
    
    He has published over 35 refereed papers in journals and written over 160 case studies. He has also published six co-authored books. His expertise spans applied Operations Research and Management modelling in network-oriented firms, including railroads and logistics, and public policy in the context of Public-Private Partnerships (PPPs) in transport infrastructure.\n
    
    He serves on the Board of Directors of several companies in the fields of infrastructure and logistics, educational institutions, and Foundations working in the domain of Logistics and Transportation. He has teaching experience at universities in India, the USA, Canada, Yugoslavia, Singapore, Tanzania, the UAE, and Japan. He was a member of the Global Future Council on Mobility of the World Economic Forum from 2013-17.\n
    
    Professor Raghuram has received several accolades, including the 'Lifetime Achievement Award' for Transport Excellence, by Mahindra and Mahindra, supported by the Ministry of Road Transport and Highways in 2018; the 'MC Puri Memorial Award' for contribution to Operational Research in India in 2016; and 'The Lifetime Achievement Award' for contribution to Logistics and Infrastructure by EXIM News in 2014.\n
    
    He has offered consultancy services to over 100 organisations, including multilateral agencies. He has been part of various government policy-making and advisory committees for the Ministries of Civil Aviation, Consumer Affairs and Public Distribution, Railways, Road Transport and Highways, and Shipping. He has also played roles in the Cabinet Secretariat, Comptroller and Auditor General, the Planning Commission, and various State Governments.
    
          `,
      },
      {
        image: "/assets/home/advisory/ManojKSingh.jpg",
        title: "Manoj K. Singh",
        desig: "Founding Partner, S&A Law Offices",
        link: "https://www.linkedin.com/in/manoj-k-singh-72817a9/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
        Manoj K Singh of S&A Law Offices, New Delhi, India, is a reputable lawyer specialising in commercial disputes and advisory, with a keen focus on the infrastructure sector. His practice areas encompass commercial litigation and arbitration (both domestic and international), white-collar crime, bankruptcy law, company law, international trade law, banking & debt recovery laws, securities law, and taxation.\n
    
    He advises clients on all aspects related to the functioning of infrastructure projects, foreign investment in India, offshore commercial borrowings, cross-border taxation, project financing, anti-dumping, energy, and natural resources. His expertise also includes advising clients on commercial dispute strategies, troubleshooting advisory, and general corporate advisory.\n
    
    Mr Singh currently represents various Fortune 500 companies and large business houses. He is admired for his out-of-the-box, goal-oriented thinking and for achieving results in complex legal cases. He has approximately two decades of experience on various legal issues, during which he has appeared and argued matters before the Supreme Court of India, all High Courts in India, various Tribunals, and ad-hoc and institutional arbitrations (both domestic and international).\n
    
    Mr Singh has also acted on behalf of various government authorities, including the Government of Madhya Pradesh, New Delhi Municipal Corporation, South Delhi Municipal Corporation, Delhi Transco Ltd, Delhi Power Company Limited, Indian Oil Corporation, Government of Rajasthan, Container Corporation of India, IRCON International Limited, The Shipping Corporation of India Ltd, Solar Corporation of India, IIT Jodhpur, Rail Development Authority of India, Delhi Development Authority, Delhi Co-operative Housing Finance Corporation Ltd, Defence Research and Development Organisation, National Research Development Council, Technology Information, Forecasting and Assessment Council, The Institute of Cost Accountants of India, and Centre for E-Governance.\n
    
    Apart from being a prolific columnist in his field, Mr Singh has also authored the book titled "Infrastructure Arbitration — A Perspective", which is widely recognised as informative literature in the field.
    
        `,
      },
    
      {
        image: "/assets/home/advisory/SunilMathur.jpg",
        title: "Sunil Mathur",
        desig: "MD & CEO Siemens India",
        link: "https://www.linkedin.com/in/sunil-mathur/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
        Sunil Mathur has been the Managing Director and Chief Executive Officer of Siemens Limited, India and South Asia since 2014. He is currently a Member of the Global Leadership Team of Siemens, a Member of the Board of Siemens Healthcare Pvt Limited in India, and Chairman of Siemens Gamesa Renewable Power Pvt Ltd in India.\n
    
    Prior to 2014, he was the Executive Director and Chief Financial Officer of Siemens Limited from 2008, responsible for Sri Lanka, Bangladesh, Nepal, and Bhutan. During this tenure, he was a Member of the Global Finance Management Team.\n
    
    Mr Mathur has been with Siemens for over 30 years, holding several Senior Management positions in Germany, where he worked in the Power Generation Division and also as Chief Financial Officer of a Global Business Unit in the Industrial Automation Division of the company. He possesses wide experience in integrating companies, creating Joint Ventures, M&A, and turning around non-performing businesses in an international environment. He has worked in the United Kingdom and the United States, apart from India and Germany.\n
    
    Mr Mathur is on the National Councils of the Confederation of Indian Industry (CII) and Federation of Indian Chambers of Commerce & Industry (FICCI). He is Chairman of the CII Smart Manufacturing Council and past Chairman of the CII Western Region. He is also the past President of the Indo-German Chamber of Commerce and the Bombay Chamber of Commerce & Industry.
    
        `,
      },
    
      {
        image: "/assets/home/advisory/DKSen.jpg",
        title: "D. K. Sen",
        desig:
          " Whole-time Director and Senior Executive Vice President (Development Projects), L&T",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/dip-kishore-sen-876ab640",
        socialMedia: "linkedin",
        popupdesc: `
         Dip Kishore Sen is a Whole-time Director and Senior Executive Vice President (Development Projects), L&T. He is Chairman on the board of Nabha Power Ltd, Power Development Ltd, L&T Special Steels & Heavy Forgings Pvt Ltd (LTSSHF), L&T Infrastructure Engineering Company, L&T Oman LLC, L&T Aviation Services Pvt Ltd, and Construction Skill Development Council of India (CSDCI). He is a Director on the board of L&T Qatar LLC and Raykal Aluminium Company Pvt Ltd, and is also Managing Director for L&T Infrastructure Development Projects Ltd (L&T IDPL). The Minerals & Metals (M&M) Strategic Business Group of L&T comes under his charge.\n
    
    A civil engineering graduate from IIT Kharagpur and a postgraduate in business management from XLRI, Jamshedpur, Mr Sen worked for 12 years with reputed companies such as Tata Steel, Jamshedpur, and Development Consultants, Kolkata, before joining L&T. At the beginning of his career, he worked on a turnkey EPC transmission line project in Malaysia for HGEC, India.\n
    
    He has played a prominent role in establishing L&T in the GCC Countries by securing several landmark projects and many urban infrastructure development projects in Qatar, Oman, and the UAE.\n
    
    He is a member of the curriculum advisory committee for the postgraduate course in Infrastructure, IIT Kharagpur, and the Infrastructure postgraduate course at Narsee Monjee Institute of Management Studies, Mumbai. He has been associated with various industry organisations, including the Federation of Indian Chambers of Commerce & Industry (FICCI), the Confederation of Indian Industry (CII), National Highways Builders' Federation (NHBF), First Construction Council (FCC), and Construction Federation of India (CFI). He is also the Chairman of the National Council on Roads, Highways & Transportation, ASSOCHAM.
    
         `,
      },
    
      {
        image: "/assets/home/advisory/ArunNanda.jpg",
        title: "Arun Nanda",
        desig:
          "Chairman, Mahindra Holidays & Resorts Ltd. and Mahindra Lifespace Developers Ltd",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `Arun Nanda is a fellow member of the Institute of Chartered Accountants of India (FCA) and a fellow member of the Institute of Company Secretaries of India (FCS). He also participated in a Senior Executive Programme at the London Business School. And holds a degree in Law from the University of Calcutta.\n
    
    He joined the Mahindra Group in 1973 and held several important positions over his 40 years with the company. He was inducted into the Board of Mahindra & Mahindra Ltd (M&M) in August 1992 and resigned as Executive Director in March 2010 to focus on the social sector and to create a favourable ecosystem for senior citizens. He served as a non-executive director from April 2010 until August 2014.\n
    
    Mr Nanda is currently the Chairman of Mahindra Holidays & Resorts (I) Ltd and Chairman of Holiday Club Resorts Oy, Finland. He is Chairman of the Governing Board of the Centre for Social and Behaviour Change Communication, a Member of the Governing Body of HelpAge India, and on the Advisory Board of TechnoServe India. He is also Chairman Emeritus of the Indo-French Chamber of Commerce.\n
    
    He was Chairman of the CII Western Region Council for the year 2010-2011, Chairman of the Tourism & Hospitality Skill Council, and Chairman of the CII National Task Force on Affirmative Action. He was a Member of the Task Force set up by the B20 on Anti-Corruption, which presented the policy paper to President Sarkozy at the G20 Summit held in Cannes in November 2011 and to President Putin in St. Petersburg in June 2013.\n
    
    Mr Nanda is passionate about skilling youth, particularly young girls from the backward areas of the country. He was Chairman of the CII National Committee on Skill Development & Livelihood from April 2017 to March 2021 and was on the Board of the National Skill Development Corporation for several years. He is currently a Patron of the PanIIT Alumni Reach For India Foundation (PARFI), an IIT alumnus initiative to skill youth in India, and is the Chairman of PanIIT Alumni Reach For Madhya Pradesh Foundation (PARAM).\n
    
    Mr Nanda was honoured with the "Chevalier de la Légion d'Honneur" (Knight of the National Order of the Legion of Honour) by the President of the French Republic, Nicolas Sarkozy, in 2008.
    
    
         `,
      },
    
      {
        image: "/assets/home/advisory/Arun.jpg",
        title: "Arun Maira",
        desig:
          "Chairman, HelpAge International; Ex-Chairman, BCG India; Former Member, Planning Commission",
        link: "https://www.linkedin.com/in/arun-maira-5499711b4/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
          Arun Maira brings a diverse background encompassing experience as a hands-on leader and a consultant to leaders. He is a thought leader on subjects such as leadership and organisational transformation within the private, public, and social sectors.\n
    
    Mr Maira has authored several books on institutional transformation and writes regularly in journals. He was a Member of India's Planning Commission from 2009 to 2014. Prior to this, he was Chairman of the Boston Consulting Group, India. Earlier in his career, he worked with the Tata Group in India for 25 years, and for another 10 years with Arthur D Little Inc and Innovation Associates in the USA.\n
    
    Currently, Mr Maira is Chairman of HelpAge International and an advisor to several civil society networks.
    
          `,
      },
      {
        image: "/assets/home/advisory/DilipCherian.jpg",
        title: "Dilip Cherian",
        desig:
          "Founder, Perfect Relations; Image Guru, Litigation Communications, Chair Kautilya School of Public Policy.",
        link: "https://www.linkedin.com/in/dilipcherian/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
         Dilip Cherian possesses extensive experience and expertise in policy, bureaucracy, economy, and media. His extensive experience as a communications consultant includes advising over 800 corporate CEOs. He is recognised for his expertise in image management and policy affairs.\n
    
    As co-founder of Perfect Relations, a leading public relations and public affairs consultancy group in South Asia, Mr Cherian pioneered the concept of image management in India. Over 32 years, the company, under his leadership, provided services to more than 3,800 clients, with 440 professionals in 18 offices across India.\n
    
    Mr Cherian's past experiences have been diverse. He began his career in the government as an Economic Consultant to the Ministry of Industry (B.I.C.P.). He later joined Business India, a prominent publication, and eventually became an editor at one of India's leading business magazines. Along the way, he has been an internet start-up founder, run a popular restaurant, and launched a TV show.\n
    
    As an independent director, Mr Cherian serves on the boards of prominent organisations such as Radio One, a prominent English Radio FM channel; Jagran, India's largest Hindi daily newspaper; and Bajaj Consumer Care, a prominent consumer product company. Significant public appointments include positions he has held on boards like the Advertising Standard Council of India (ASCI), the National Institute of Design (NID), the Apex Committee of Investor Education and Protection Fund (IEPF) under the Ministry of Company Affairs, and the Central Board of Film Certification (CBFC).
    
         `,
      },
    
      {
        image: "/assets/home/advisory/CyrilShroff.png",
        title: "Cyril Shroff",
        desig: "Managing Partner, Cyril Amarchand Mangaldas",
        link: "https://www.linkedin.com/in/cyrilshroff/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
         With over 43 years of experience in areas including corporate law, securities markets, banking, infrastructure, and other related fields, Mr Shroff is consistently rated as a leading corporate, banking, and project finance lawyer in India. This recognition comes from several international surveys, such as the International Financial Law Review (IFLR), Euromoney, Chambers Global, Asia Legal 500, and Asia Law.\n
    
    He has received several awards from legal publications. Mr Shroff was featured in issues of Asian Legal Business (ALB) as 'Dealmakers of the Year 2016', notably as the only individual from India. He was also awarded 'Emerging Markets Firm Leader of the Year – Independent' at the Asian Lawyer Emerging Markets Awards 2016, organised by American Legal Media. He is recognised as a "legendary figure in the Indian legal community" and is consistently ranked as a "star practitioner" in India by Chambers Global. He is often regarded as the "M&A King of India".\n
    
    Mr Shroff is a member of the SEBI Committee on Corporate Governance and Insider Trading. He is also a member of the first Apex Advisory Committee of IMC International ADR Centre (IIAC); an advisory member of the Finance Planning Standard Board of India (FPSB India); and Macquarie. He was recently appointed as a task force member of the Society of Insolvency Practitioners of India (SIPI). He is a member of the Media Legal Defence Initiative (MLDI) International Advisory Board and is part of various committees of the Confederation of Indian Industry (CII) and Federation of Indian Chambers of Commerce & Industry (FICCI).\n
    
    He has authored several publications on legal topics. Mr Shroff is a member of the Advisory Board of the Centre for Study of the Legal Profession established by the Harvard Law School; a member of the Advisory Board of the National Institute of Securities Markets (NISM); and on the Board of IIM, Trichy.
    
         `,
      },
    ]

    return {
      advisors,
      totalCount: advisors.length,
      lastUpdated: new Date().toISOString()
    };
  }
}
