import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';

@Injectable()
export class OrganisationService {
  constructor(private readonly prisma: PrismaService) { }

  private get model(): any {
    return (this.prisma as any).organisationDetails;
  }

  private async upsertSingleton() {
    return this.model.upsert({
      where: { singletonKey: 'singleton' },
      update: {},
      create: {
        singletonKey: 'singleton',
        address: '',
        emails: [],
        phones: [],
        locationMapUrl: '',
        companyTagline: '',
        vision: '',
        mission: '',
      },
    });
  }

  async getPublic() {
    const details = await this.model.findUnique({ where: { singletonKey: 'singleton' } });
    const data = details ?? (await this.upsertSingleton());

    const { emails, phones, ...rest } = data;
    return {
      ...rest,
      email: emails?.[0] ?? "",
      phone: phones?.[0] ?? "",
    };
  }
  async updateAll(data: UpdateOrganisationDto) {
    const existing = await this.upsertSingleton();

    return this.model.update({
      where: { singletonKey: 'singleton' },
      data: {
        address: data.address ?? existing.address ?? "",
        emails: data.email ? [data.email] : existing.emails ?? [],
        phones: data.phone ? [data.phone] : existing.phones ?? [],
        locationMapUrl: data.locationMapUrl ?? existing.locationMapUrl ?? "",
        companyTagline: data.companyTagline ?? existing.companyTagline ?? "",
        vision: data.vision ?? existing.vision ?? "",
        mission: data.mission ?? existing.mission ?? "",
      },
    });
  }
}


