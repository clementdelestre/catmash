import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from 'src/shared/entities/cat.entity';
import { Repository } from 'typeorm';
import { VoteEntity } from '../../../shared/entities/vote.entity';
import { ResponseDto } from 'src/shared/dto/response.dto';

@Injectable()
export class VoteService {

    constructor(
        @InjectRepository(CatEntity) private readonly catRepo: Repository<CatEntity>, 
        @InjectRepository(VoteEntity) private readonly voteRepo: Repository<VoteEntity>, 
    ) { }
    
    async getCandidates() {
        
        const cats = await this.catRepo.createQueryBuilder('cat')
            .orderBy('RANDOM()')
            .limit(2)
            .getMany()
        
        return cats;
    }

    async vote(catId: number) {
        const cat = await this.catRepo.findOne({where: { id: catId }});
        if (!cat) {
            throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
        }
        const vote = this.voteRepo.create({ cat });
        await this.voteRepo.save({ date: new Date(), ...vote });
        
        return new ResponseDto(true, null, 'Vote registered successfully', HttpStatus.CREATED);
    }

}
