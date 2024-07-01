import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STORAGE_CONSTANTS } from 'src/shared/constants/storage.constants';
import { CatEntity } from 'src/shared/entities/cat.entity';
import { Repository } from 'typeorm';
import { createReadStream, existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';

@Injectable()
export class CatService {

    constructor(@InjectRepository(CatEntity) private readonly catRepo: Repository<CatEntity>, ) {}

    async getPicture(catId: number){
        const cat = await this.catRepo.findOne({where: { id: catId }});

        if(!cat){
            throw('Cat not found');
        }

        const path = STORAGE_CONSTANTS.CAT_PICTURES + cat.picture;

        if(!existsSync(path)){
            throw('Picture not found');
        }

        return path;
    }
}
