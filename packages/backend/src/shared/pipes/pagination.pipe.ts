import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PageOptionsDto } from '../dto/page-options.dto';

@Injectable()
export class PaginationTransformPipe implements PipeTransform {
    async transform(dto: PageOptionsDto, { metatype }: ArgumentMetadata) {
        if (!metatype) {
            return dto;
        }

        return plainToInstance(metatype, dto);
    }
}