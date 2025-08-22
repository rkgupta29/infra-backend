import { Injectable } from '@nestjs/common';


@Injectable()
export class FellowService {
  /**
   * Get all patrons
   * @returns Static patrons data
   */
  async getFellow() {
    const fellow: any[] = [
      {
        image: "/assets/home/fellows/rasikaAthawale.jpg",
        title: "Rasika Athawale",
        desig: "Electricity policy & regulatory expert; Consultant, Big4 Consulting",
        subtitle:"Distinguished Fellow (Power)",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/rasika-athawale-5072ab1/",
        socialMedia: "linkedin",
        popupdesc: `
         Rasika Athawale is a management professional with approximately two decades of experience in the energy and utilities sector, having worked as a power utility executive, a strategy consultant with Big Four management consulting firms, a research programme manager at a Big Ten US State University, and a US think tank.\n
    
    Her research expertise includes the economics of the power sector and energy transition, government policy and regulatory impact analysis, planning and strategy formulation for utilities, and financial modelling. Her work has been published in prominent academic journals and print media. She has a demonstrated track record of executing complex consulting engagements and managing client relationships with federal and state governments in India and the United States. She also possesses the demonstrated ability to conceptualise, market, and execute project work as an individual consultant, with experience in managing thought leadership charters for expert advisors and a prominent energy efficiency analytics firm.\n
    
    Ms Athawale is a thought leader and sector influencer who promotes inclusive dialogue by simplifying complex information under the brand of "India Energy Insights". She writes and provides inputs for media outlets (contributing author for MoneyControl) and has published "Electric utility death spiral: Revisited in the context of tariff design" in The Electricity Journal, December 2021, which features in the list of most downloaded articles. She was also a speaker at the Virtual Workshop on Regulatory Reforms, organised by the National Institute of Advanced Studies, in April 2022.\n
    
    A B.Tech. in Chemical Engineering (Nagpur University) and a PGDBM in Finance from Sydenham Institute of Management, Mumbai University, Ms Athawale's career has spanned a range of prominent organisations and significant projects in the energy sector. These include Adani Electricity, ICICI Bank, PricewaterhouseCoopers, KPMG Advisory Services, APPRISE Incorporated, Princeton (USA), Rutgers (New Jersey), Hiranandani Group, and several others.\n
    
    She was a faculty for a Distribution Reforms training programme by USAID from 2004 to 2005. From 2011 to 2012, she was a member of the National Team, India Smart Grid Forum, and a Member of the Maharashtra State Smart Grid Committee (to determine measures for strengthening of R-APDRP by the Ministry of Power, Delhi).
    
         `,
      },
    
      {
        image: "/assets/home/fellows/supratimSarkar.jpg",
        title: "Supratim Sarkar",
        desig: "Former Executive Vice President and Group Head, SBICAPS",
        popupImg: "/assets/home/trustees/vinayakImg.png",
         subtitle:"Distinguished Fellow (Financial Services)",
        link: "https://www.linkedin.com/in/supratim-sarkar-577a0629b",
        socialMedia: "linkedin",
        popupdesc: `
        Supratim Sarkar brings over 25 years of experience in the financial services sector. He joined IDBI in 1995 and moved to SBICAPS in November 2000, where he served for 12 years as Executive Vice President and Group Head. In this role, he led a team of approximately 300 professionals across diverse areas, including Project Finance, Corporate Finance, Structured Finance, and Advisory services for project bidding, mine auctions, and disinvestments.\n
    
    Since March 2022, Mr Sarkar has pursued an independent career as a Financial Advisor, working on multiple projects. He possesses a strong network with private sector leaders, PSUs, banks, Chief Investment Officers of Funds, senior bureaucrats, and government departments.\n
    
    He has worked on different committees established by state governments and the Government of India, on matters such as the reintroduction of Development Finance Institutions (DFIs), the resolution of coastal power projects based on imported coal, the resolution of tarifsf for Independent Power Producers (IPPs), etc. Notably, he led the ideation of the National Bad Bank, now known as NARCIL.\n
    
    Mr Sarkar was a part of the CII Infrastructure subcommittee and participated in FICCI delegations to the US and Canada alongside government dignitaries. He is a regular speaker at webinars and panel discussions organised by industry chambers and partners.\n
    
    After graduating as a Mechanical Engineer from Jadavpur University in 1988, Mr Sarkar completed his post-graduation in Aeronautical Engineering from IIT Madras and subsequently his MBA with a specialisation in Finance from BIM Tiruchirapalli.
    
        `,
      },
      {
        image: "/assets/home/fellows/rajivRanjanMishra.jpg",
        title: "Rajiv Ranjan Mishra",
        popupImg: "/assets/home/trustees/vinayakImg.png",
         subtitle:"Distinguished Fellow (Water Conservation)",
        link: "https://www.linkedin.com/in/rajiv-mishra-48413553",
        socialMedia: "linkedin",
        desig: "Formerly Director General, National Mission for Clean Ganga; Chief Technical Advisor, NIUA",
        popupdesc: `
         Mr Rajiv Ranjan Mishra recently retired from his position as Director General for the National Mission for Clean Ganga (NMCG), a role in which he transformed the Namami Gange Programme into an integrated, multi-sectoral model framework for river rejuvenation in India.\n
    
    As Additional Secretary, India's Ministry of Housing and Urban Affairs, he steered several policies in the housing sector, urban SDGs, New Urban Agenda, and sustainable technologies. He also played a pivotal role in the enactment of the landmark Real Estate (Regulation and Development) Act, 2016 (RERA).\n
    
    In 2021, Mr Mishra was bestowed with the Annual Research Award from IIT Roorkee for his work on the rejuvenation of the river Ganga. Over the course of his time at NMCG, he guided the organisation to international and national recognition, including the Public Agency of the Year Award (Distinction) by Global Water Intelligence.\n
    
    Mr Mishra implemented significant policy changes at NMCG through several key projects and policy interventions, including PPPs in wastewater management via a hybrid annuity mode and a 'One City-One Operator' approach for improved sustainability and governance in wastewater management. He has also developed innovative frameworks to plan 'river cities' by mainstreaming rivers and water within urban master plans, highlighting water-sensitive urban design and developing the River Cities Alliance (RCA).\n
    
    Mr Mishra is the co-author of "Ganga: Reimagining, Rejuvenating, Reconnecting", an account of the scale of challenges, institutional processes, and reforms that generated momentum and positively impacted a river's health and the sustainability of those impacts. He has published several articles, papers, and opinion columns in various journals and magazines. He also edited a special issue on river rejuvenation in the Journal of Governance and served as editor and contributor on "Managing Urban Rivers: From Planning to Practice", a set of articles by national and international experts being published by Elsevier.\n
    
    He has contributed to many national and international training sessions and seminars. He holds Certificates in Advanced Studies in Public Administration from Maxwell School, Syracuse University, US; Public Budgeting from Georgia State University, Atlanta; Project Management from University of California, Berkeley; and the 'Leaders in Development' programme from Harvard Kennedy School, Cambridge, US.\n
    
    Currently, he serves as Chief Advisor and Chairman of the Strategy & Policy Unit at the National Institute of Urban Affairs, India. Additionally, he acts as an advisor to the Centre for Ganga River Basin Management and Studies at the Indian Institute of Technology (IIT), Kanpur.
    
         `,
      },
      {
        image: "/assets/home/fellows/rajajiMeshram.png",
        title: "Rajaji Meshram",
        popupImg: "/assets/home/trustees/vinayakImg.png",
         subtitle:"Distinguished Fellow (Transport and Logistics)",
        desig: "Transport and Logistics sector expert; Consultant, World Bank in India",
        link: "https://www.linkedin.com/in/rajaji-meshram-9aa3437/",
        socialMedia: "linkedin",
        popupdesc: `
         Mr Rajaji Meshram has over 25 years of experience in strategy development, business planning, and the development of regulatory frameworks. His expertise spans large infrastructure projects in India, as well as countries such as Bangladesh, Saudi Arabia, Mongolia, Kenya, the UAE, and Sri Lanka.\n
    
    He began his career with the Indian Railways, spending more than six years working across different areas of operations, maintenance, and project management. He has been involved in various policy formulation, feasibility assessment, transaction advisory, and Public-Private Partnership (PPP) projects across sectors within the transportation domain. His last corporate role was Partner, EY India. He has also worked with prominent corporations like IBM, KPMG, and PwC.\n
    
    Currently, Mr Meshram is collaborating on projects with the World Bank and Asian Development Bank as an independent expert. Some of his notable contributions include:\n
    
    1. Preparation of the LEADS report for the Ministry of Commerce and Industry, Government of India.\n
    2. Updating the National Transport Policy 2006 of Bhutan for the United Nations Development Programme.\n
    3. Logistics Capacity Development in Mongolia for the Asian Development Bank.\n
    4. Assessment of cost reduction opportunities for Saudi Arabia Railway.\n
    5. Process audit of Etihad Rail DB, the UAE.\n
    6. Providing advisory services for the structuring of track access charges (tariffs) and setting a non-discriminatory access regime in the Dedicated Freight Corridor Corporation of India Ltd (DFCCIL), a World Bank-funded project.\n
    7. Developing a regulatory structure for the Visakhapatnam-Chennai Industrial Corridor, Andhra Pradesh, for the Asian Development Bank.\n
    8. Recommending a corporate planning framework for the Railway Planning & Investment Organisation (RPIO) and the Special Unit for Transportation Research and Analysis (SUTRA) in Indian Railways.\n
    9. Sagarmala Project Management consultancy for the Ministry of Shipping and Ports, Government of India.\n
    10. Transaction advisory for Concession and Operation Agreements for creating an Open Access Aviation Fuel Facility at airports for the Airports Authority of India (AAI).\n
    11. Capacity development in Oxygen Logistics in four states and assisting in developing tools for oxygen transport planning through road and rail (World Bank).\n
    
    Rajaji holds an MBA from IIM Ahmedabad and participated in the prestigious Gurukul Leadership programme at the London School of Economics. He is a member of the National Council of the Chartered Institute of Logistics and Transport, India.
    
         `,
      },
    
      {
        image: "/assets/home/fellows/SoumyaKantiGhosh.jpg",
        title: "Dr Soumya Kanti Ghosh",
         subtitle:"Distinguished Fellow (Economic Policy)",
        desig: "Group Chief Economic Advisor at SBI; Member, PM's Economic Advisory Council; Member, Sixteenth Finance Commission",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/soumya-kanti-ghosh-2043921a/",
        socialMedia: "linkedin",
        popupdesc: `
        Dr Soumya Kanti Ghosh is currently the Group Chief Economic Advisor at the State Bank of India. He was recently appointed as a member of the Prime Minister's Economic Advisory Council and is also a member of the Sixteenth Finance Commission. Previously, he has worked at Tata AIA, American Express, and ICRA, among other organisations.\n
    
    Dr Ghosh was an instrumental co-author in a key initiative that, for the first time, captured payroll data in India, covering both formal and informal sectors. He contributed to the design of schemes such as the PMKISAN for farmers and the Emergency Credit Line Guarantee Scheme (ECLGS) for MSME borrowers, and the restructuring of the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTSME) scheme, among others. These initiatives proved effective during and after the pandemic. Following his report, EPFO and ESIC began publishing monthly payroll data.
    \n
    
    He serves as Chairman of the Indian Banks' Association's Economist Group. He is also a member of the Insolvency Board Committee on Research and the Editorial Advisory Board of the Indian Institute of Banking and Finance (IIBF). Additionally, Dr Ghosh is a member of the Governing Board at the Indian Institute of Corporate Affairs (IICA), Technical Advisory Committee for revision of Index of Industrial Production, Working Group for the revision of current series of WPI, and the Expert Committee for revision of Economic classifications (NIC and NPC). For eight successive years, ending in 2025, Dr Ghosh was ranked as one of the best individuals in research in India by The Asset magazine.
    \n
    
    Dr Ghosh has an extensive list of publications in media and international and national journals. He completed his doctoral thesis at Jawaharlal Nehru University (JNU) and is currently a Distinguished Fellow at The Infravision Foundation.
    
    
         `,
      },
      {
        image: "/assets/home/fellows/AkhileshTilotia.jpg",
        title: "Akhilesh Tilotia",
         subtitle:"Distinguished Fellow (Public Policy)",
        desig: "Co-founder at Thurro; Former Head of Research at NIIF",
        link: "https://www.linkedin.com/in/atilotia/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
          Akhilesh Tilotia is an astute observer of the economic, political, and social landscape of India. His distinct perspective in commentary is shaped by his diverse experiences as a government officer, an economist, a banker, and a strategist. These multiple world-views have enabled him to emerge as a "dot-joiner": piecing together disparate issues into a coherent picture.\n
    
    In his previous roles, he has served as the Head of Research at the National Investment and Infrastructure Fund (NIIF). He has led Strategy and New Initiatives for Axis Bank, worked with the Kotak Group, The Boston Consulting Group, and was a co-founder of PARK Financial Advisors.\n
    
    His bestselling book, "The Making of India – Game-Changing Transitions" (2015), introduced the concept of "private cost of public failure" and explored its implications for investors. His second book, "Through the Looking Glass" (2021), examines the India story from the perspectives of bureaucrats, politicians, and citizens, drawn from his first-hand observations during a three-year stint in New Delhi with a union minister.\n
    
    Akhilesh holds an MBA from IIM Ahmedabad and is an alumnus of MITx.
    
          `,
      },
    ];
    

    return {
      fellow,
      totalCount: fellow.length,
      lastUpdated: new Date().toISOString()
    };
  }
}
