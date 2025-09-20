import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';

@Injectable()
export class GalleryFormDataPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'body') {
            return value;
        }

        const dto = value as CreateGalleryItemDto;

        // Transform year to number
        if (dto.year !== undefined) {
            if (typeof dto.year === 'string') {
                const year = parseInt(dto.year, 10);
                if (isNaN(year)) {
                    throw new BadRequestException('Year must be a valid number');
                }
                dto.year = year;
            }
        }

        // Transform active to boolean
        if (dto.active !== undefined) {
            const activeValue = dto.active as unknown;
            if (typeof activeValue === 'string') {
                if (activeValue.toLowerCase() === 'true') {
                    dto.active = true;
                } else if (activeValue.toLowerCase() === 'false') {
                    dto.active = false;
                } else {
                    throw new BadRequestException('Active must be a boolean value (true or false)');
                }
            }
        }

        return dto;
    }
}
