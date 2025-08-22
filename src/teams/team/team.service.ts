import { Injectable } from '@nestjs/common';


@Injectable()
export class TeamService {
  /**
   * Get all patrons
   * @returns Static patrons data
   */
  async getTeam() {
    const team: any[] = [
      {
        image: "/assets/home/trustees/vinayakImg.png",
        title: "Vinayak Chatterjee",
        desig: "Founder & Managing Trustee",
        link: "https://x.com/infra_vinayakch?lang=en",
        socialMedia: "X",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
         Vinayak Chatterjee co-founded Feedback Infra Pvt Ltd in 1990 and served as its Chairman from 1990 to 2021. Since stepping down from active management, he now dedicates his time and energy to infrastructure policy and advocacy, as well as to nurturing educational institutions.\n
    
    Mr Chatterjee is frequently called upon to play a strategic advisory role to leading domestic and international corporates, the Government of India, various ministries involved in infrastructure, and multilateral and bilateral institutions in the areas of infrastructure policy, planning, and implementation. He is a leading proponent of the Public-Private Partnership (PPP) model for developing India's infrastructure. His more recent engagements with the Government of India include being a member of the Committee on setting up a Development Finance Institution (DFI) and a member of the Consultative Group on PPPs at NITI Aayog.\n
    
    In 1998, the World Economic Forum at Davos recognised him as one of the 100 Global Leaders of Tomorrow. In 2011, the Indian Institute of Management, Ahmedabad, conferred on him the "Distinguished Alumnus Award".\n
    
    Mr Chatterjee is currently the Chairman of the Confederation of Indian Industry's (CII) National Council on Infrastructure and has chaired various infrastructure and economic committees at the national level of CII since 2001. He is on the Board of Directors of ACC Ltd, Apollo Hospitals Enterprise Ltd, KEC International Ltd, and L&T Infotech Ltd; and is a member of the Advisory Board of JCB India. He serves as the Chairman of the Board of Governors of the Indian Institute of Technology, Dharwad, and on the Boards of the Indian Institute of Management, Sirmaur, and the National Rail and Transportation Institute, Vadodara.\n
    
    He is a popular columnist and writes a monthly column on infrastructure for Business Standard called "INFRATALK". He has also authored a book titled "Getting it Right – India's Unfolding Infrastructure Agenda", published in 2011.\n
    
    
    Mr Chatterjee graduated in Economics (Hons.) from St. Stephen's College, Delhi University (1976-1979) and completed his MBA from the Indian Institute of Management, Ahmedabad (1979–1981).
    
         `,
      },
      {
        image: "/assets/home/team/RumjhumChatterjee.jpg",
        title: "Rumjhum Chatterjee",
        desig: "Co-Founder & Managing Trustee",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/rumjhum-chatterjee-396041268",
        socialMedia: "linkedin",
        popupdesc: `
          Rumjhum Chatterjee co-founded the Feedback Infra Group. Following a successful tenure, she recently stepped down from her role as Group Managing Director and Head — Human Capital within the organisation.\n
    
    She is currently the Chairperson of the Feedback Foundation Charitable Trust. The Trust is deeply involved in rural and urban sanitation, including solid waste management, and has successfully implemented numerous projects nationwide through community engagement. Ms Chatterjee pioneered community-led interventions for Resettlement and Rehabilitation (R&R) post land acquisition for infrastructure projects. Her paper, "Sustainable Rehabilitation Interventions through Community Engagement," was published in the India Infrastructure Report 2009, issued by the 3iNetwork.\n
    
    A leading practitioner in human capital management within the infrastructure sector, she was recognised as one of the 20 Most Talented HR Leaders in India by the World HRD Congress in 2013. She plays an active role in the Confederation of Indian Industry (CII), notably as the first woman Chairperson for the CII Northern Regional Council (2016-17). With a deep interest in women's empowerment, she chaired CII's Women Exemplar Program (2015-17) and has served on its Jury Selection Committee since its inception in 2005. She also chaired the CII National Women's Empowerment Committee for several years, representing industry perspectives on this critical issue before Parliamentarians in India. Furthermore, she participated in a closed-door interaction to discuss this topic with the Prime Minister of Japan, Mr Shinzo Abe, during his visit to India in January 2014.\n
    Currently, she co-chairs CII's National Committee on CSR. She previously served as an Independent Director on the Board of Blue Star Ltd. and presently serves on the Boards of Somany Ceramics Ltd and C&S Electric Ltd (a subsidiary of Siemens India Ltd). She is the Vice Chairperson and a member of the Governing Body of HelpAge India, the country's largest not-for-profit organisation dedicated to the welfare of the aged. She is also a Trustee of HDFC Schools. Ms Chatterjee holds a degree in Psychology from Calcutta University.
    
          `,
      },
      {
        image: "/assets/home/team/jagan.jpg",
        title: "Jagan Shah",
        desig: "Cheif Executive Officer",
        link: "https://www.linkedin.com/in/jagan-shah/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
         
    Jagan Shah is an architect and urbanist with a strong interest in the future of cities. Currently a senior expert in urban development policy and practice at Artha Global, he has been engaged with the urban sector in India for more than twenty years, through consultancy, teaching, writing, and public speaking.\n
    
    From 2013 to 2019, he served as Director of the National Institute of Urban Affairs, a leading urban think tank in India. Under his leadership, the organisation provided evidence-based policy and planning support to urban local bodies, state governments, and the central Ministry of Housing and Urban Affairs. This support covered a diverse range of subjects, including smart city development, e-governance, integrated spatial and physical planning, water and sanitation, municipal finance, transit-oriented development, land value capture, resilience, and sustainability.\n
    
    He is a member of the Board of Trustees, Clean Air Asia India. He has also served as a consultant with the World Bank and a Resident Senior Fellow at the IDFC Institute.\n
    
    Mr Shah received his education and training at the School of Planning and Architecture, New Delhi; the University of Cincinnati; and Columbia University, New York.
    
         `,
      },
      {
        image: "/assets/home/team/KavereeBamzai.png",
        title: "Kaveree Bamzai",
        desig: "Head — Advocacy",
        link: "https://www.linkedin.com/in/kavereebamzai/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
          Kaveree Bamzai has been a journalist for 35 years. She was the first and, so far, only woman editor of India Today magazine, where she worked for 17 years before leaving in 2019 to pursue an independent career.\n
    
    She has worked in various capacities with two prominent national dailies, The Times of India and The Indian Express, handling diverse portfolios, from front page editor to Sunday Magazine editor. At India Today, she edited special issues dedicated to key areas of development, from infrastructure to social entrepreneurship. She also curated the annual India Today Conclave, a meeting ground for thought leaders and opinion makers; started Mind Rocks, an annual event for young people; as well as the India Today Woman Annual Summit and Awards. She also curated the annual Safaigiri Awards and Summit after the announcement of the Swachh Bharat Mission.\n
    
    Since leaving India Today, she has curated events for The New Indian Express and the ABP Network, including a national education conclave, ThinkEdu; the annual Odisha Literary Festival; the Devi Awards for Women; and the Ideas of India Summit. She is a speaker at media and literary events and has been a TEDx speaker as well.\n
    
    She is the author of various monographs and essays, as well as three books, among them "No Regrets: The Guilt-free Woman's Guide to a Good Life" and "The Three Khans and the Emergence of New India". She is a frequent columnist on cinema and society for Dainik Bhaskar, The Times of India Plus, and The New Indian Express, and is a contributing editor to Open magazine. She is the presenter of Tiffin Talks, a well-regarded series of digital interviews with media personalities, as well as street stories, dedicated to women who are making a difference.\n
    
    She went to school at the Convent of Jesus and Mary, New Delhi, and Loreto and La Martiniere, Kolkata. She completed an undergraduate degree in economics at St Xavier's College, Kolkata, and a postgraduate degree in sociology at the Delhi School of Economics, where she won the MSA Rao Scholarship for Academic Excellence. She was also a Chevening Fellow, a scholarship awarded by the British Foreign and Commonwealth Office.\n
    
    She was designated a 'game-changer' by Save the Children, is a member of the Women Exemplar Jury of the CII Foundation, and has been a member of various juries and committees in the media space.
    
    
          `,
      },
      {
        image: "/assets/home/team/MutumChaobisana.png",
        title: "Dr Mutum Chaobisana",
        desig: "Head — Programmes",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/dr-mutum-chaobisana-83647017/",
        socialMedia: "linkedin",
        popupdesc: `Dr Mutum Chaobisana is an Architect-Urban Planner with a PhD in Urban Planning and a career marked by significant contributions to the urban sector and the development of Himalayan ecosystems in India.\n
    
    Her roles have included Head-Programmes at The Infravision Foundation, Lead-Urban Planner at IIFCL Projects Ltd (a PSU under the Ministry of Finance), Sector Coordinator-Urban Planning at the National Institute of Urban Affairs (NIUA), Senior Consultant at the Ministry of Housing and Urban Affairs, and Assistant Director (Planning) at the Delhi Development Authority. In these positions, she has played key roles in policy formulation, drafting development control norms, and implementing infrastructure projects.\n
    
    She has delivered sustainable rural-urban solutions, shaped strategic projects, and formulated vision and strategies for urban development. She has successfully spearheaded the development of master plans, including the Delhi Master Plan 2021 and 2041, and the Slum Rehabilitation Policy. She also developed national policy and guidelines in key urban missions such as PMAY-U, Rental Housing, and Retirement Homes. Her work also extends to eco-tourism, conservation of natural ecosystems and riverfront development, townships and regional planning initiatives in the North Eastern Region.\n
    
    Throughout her professional tenure, Dr Mutum has been affiliated with esteemed entities such as the Ministry of Finance, the Ministry of Tourism, the Ministry of Housing and Urban Affairs, state government agencies, the Ministry of Development of the North Eastern Region, and international donor agencies. Her proficiency in stakeholder engagement and fostering strategic partnerships has contributed to driving inclusive growth and sustainable development. She is skilled in fostering collaborative relationships with state and central government agencies and donor agencies, and delivering vision and strategic development initiatives and infrastructure projects. She is well-versed in coordinating and managing partnerships with international agencies, think tanks, government officials at state and central ministries, Urban Local Bodies (ULBs), political leaders, civil societies, and NGOs.
    
          `,
      },
    
      {
        image: "/assets/home/team/VrindaSingh.jpg",
        title: "Vrinda Singh",
        desig: "Research Associate",
        link: "https://www.linkedin.com/in/vrinda-singh-3951951b4/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
          Vrinda Singh is an urban policy professional dedicated to shaping the future of India's cities. In her role as a Research Associate at The Infravision Foundation, she contributes to impactful urban development initiatives.\n
    
    Her educational background reflects her commitment to understanding the complexities of urban development. Ms Singh holds a dual master's degree: one in Political Science from Calcutta University and another in Public Policy and Governance from the Tata Institute of Social Sciences (TISS), specialising in Urbanisation. This demonstrates her strong commitment to understanding and addressing the nuances of urban policy.\n
    
    Diverse experiences, spanning across prominent organisations such as The Energy and Resources Institute (TERI) and Janaagraha, have provided her with comprehensive knowledge and hands-on experience in climate action plans, flood management policies, civic engagement initiatives, urban governance complexities, parliamentary research, and green transport research. This demonstrates her expertise in conducting primary and secondary research, analysing policies, interpreting data, and engaging with stakeholders.\n
    
    In addition to her professional pursuits, Ms Singh holds a strong interest in infrastructure planning, finance, and sustainable development, with a distinctive focus on addressing climate change and environmental sustainability. She is committed to advocating for policies and initiatives that promote environmental stewardship and resilience, embodying a dedication to catalysing positive change in the realm of public policy. As she continues her work at The Infravision Foundation, Ms Singh remains dedicated to driving positive change in India's urban landscape, fostering sustainable development through her initiatives.
    
          `,
      },
      {
        image: "/assets/home/team/LawrenceCardoza.png",
        title: "Lawrence Cardoza",
        desig: "Research Associate",
        link: "https://www.linkedin.com/in/lawrence-cardoza/",
        socialMedia: "linkedin",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        popupdesc: `
         Lawrence Cardoza is a dedicated advocate for sustainable development and a proponent of data-backed policymaking to achieve tangible impact. As a Research Associate at The Infravision Foundation, he aspires to build compelling narratives to put the "public" back in public policy and strengthen the foundations of a resilient nation by further developing infrastructure policies.\n
    
    Holding a PGP in Public Policy, Design, and Management from the Indian School of Public Policy and a B.A. from St. Stephen's College, Mr Cardoza combines academic rigour with hands-on experience. He has previously worked across diverse industries and functions, including operations at Better.com, sales and outreach at GenElek Technologies (supporting paraplegic veterans), and communications at the Delhi Lawn Tennis Association. In these roles, he developed expertise in stakeholder management, data analysis, and strategic communication.\n
    
    At The Infravision Foundation, Mr Cardoza contributes to policy analysis and research projects, and assists in organising initiatives like the InfraKatha sessions, aimed at fostering informed discussions on the future of infrastructure in India. With a strong interest in social infrastructure and climate-resilient infrastructure, and their intersection with public welfare, he is skilled at translating complex policy issues into accessible formats for broader audiences.\n
    
    His background also includes a focus on public policy evaluation and the socio-economic impact of initiatives, evidenced by his previous internship at the National Investment and Infrastructure Fund (NIIF).
    
         `,
      },
      {
        image: "/assets/home/team/PriyankaBains.jpg",
        title: "Priyanka Bains",
        desig: "Research Associate",
        popupImg: "/assets/home/trustees/vinayakImg.png",
        link: "https://www.linkedin.com/in/priyanka-bains-b070607b/",
        socialMedia: "linkedin",
        popupdesc: `
         Priyanka Bains is an economist by training and a problem-solver. She graduated from Lady Shri Ram College for Women with a degree in Economics and pursued her Master's in Economics at Jawaharlal Nehru University.\n
    
    Passionate about development, policy, and sustainability, she is on a mission to make agriculture smarter, more efficient, and climate-resilient — because feeding the world shouldn't cost the planet. With a keen interest in climate resilience, sustainable infrastructure, and data-driven policymaking, Ms Bains thrives on exploring innovative solutions that balance economic growth with environmental responsibility.
    
         `,
      },
    ];
    return {
      team,
      totalCount: team.length,
      lastUpdated: new Date().toISOString()
    };
  }
}
