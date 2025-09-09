import { PartialType } from '@nestjs/swagger';
import { CreateAdvisorDto } from './create-advisor.dto';

export class UpdateAdvisorDto extends PartialType(CreateAdvisorDto) { }
