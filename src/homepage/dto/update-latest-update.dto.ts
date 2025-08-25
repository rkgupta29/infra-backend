import { PartialType } from '@nestjs/swagger';
import { CreateLatestUpdateDto } from './create-latest-update.dto';

export class UpdateLatestUpdateDto extends PartialType(CreateLatestUpdateDto) {}
