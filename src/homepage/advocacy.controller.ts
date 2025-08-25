import { Controller, Get } from '@nestjs/common';

@Controller('homepage/advocacy')
export class AdvocacyController {
  @Get()
  getAdvocacy() {
    return {data: [
        {
            id: 1,
            img: "/assets/infrakatha/banner/banner.jpg",
            category: "Infrakatha",
            title:
              "A forum of conversations with cross-sectoral experts aimed at mainstreaming the discourse around infrastructure.",
            link: "/infrakatha",
            ctaText: "Know more"
          },
          {
            id: 2,
            img: "/assets/home/whoWeAre/advocacy/infraPandit.png",
            category: "InfraShakti Awards",
            title:
              "A flagship initiative in association with NDTV, celebrating changemakers unlocking impact at scale through innovative projects.",
            link: "/infrashakti-awards",
            ctaText: "Know more"
          },
          {
            id: 3,
            img: "/assets/home/whoWeAre/advocacy/infraPanditAward.png",
            category: "InfraPandit Awards",
            title:
              "A national effort at recognising outstanding doctoral research on infrastructure, fostering youth participation in India's infra evolution.",
            link: "/infrapandit-awards",
            ctaText: "Know more"
          },
    ]}
  }
}
