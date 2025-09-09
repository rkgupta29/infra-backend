import { PartialType } from '@nestjs/swagger';
import { CreateFellowDto } from './create-fellow.dto';

export class UpdateFellowDto extends PartialType(CreateFellowDto) { }
