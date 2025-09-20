import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { QueryLeadsDto } from '../dto/query-leads.dto';

@Injectable()
export class LeadsQueryPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'query') {
            return value;
        }

        const dto = value as QueryLeadsDto;

        // Convert isRead from string to boolean
        if (dto.isRead !== undefined) {
            if (typeof dto.isRead === 'string') {
                const isReadValue = dto.isRead as unknown;
                if (typeof isReadValue === 'string') {
                    if (isReadValue.toLowerCase() === 'true') {
                        dto.isRead = true;
                    } else if (isReadValue.toLowerCase() === 'false') {
                        dto.isRead = false;
                    }
                }
            }
            return dto;
        }
    }
}
