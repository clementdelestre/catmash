import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatEntity } from 'src/shared/entities/cat.entity';
import { VoteEntity } from 'src/shared/entities/vote.entity';
import { Repository } from 'typeorm';
import { RankedCatDto } from '../dto/ranked-cat.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { PageMetaDto } from 'src/shared/dto/page-meta.dto';
import { FiltersDto } from '../dto/filters.dto';

@Injectable()
export class ScoreService {
    constructor(@InjectRepository(CatEntity) private readonly catRepo: Repository<CatEntity>,
        @InjectRepository(VoteEntity) private readonly voteRepo: Repository<VoteEntity>,) {}

    async getScore(pageOptionsDto: PageOptionsDto, filters: FiltersDto){

        const subQuery = this.voteRepo.createQueryBuilder('vote')
            .select('vote.catId', 'cat_id')
            .groupBy('vote.catId')
            .orderBy('COUNT(vote.catId)', pageOptionsDto.order)
            .skip(pageOptionsDto.skip)
            .take(pageOptionsDto.take)

            .where('1=1')
            if(filters.startAt){
                subQuery.andWhere(`vote.date >= '${filters.startAt}'`)
            }
            if(filters.endAt){
                subQuery.andWhere(`vote.date <= '${filters.endAt}'`)
            }

        const itemCount = await subQuery.getCount();

        const queryBuilder = this.catRepo.createQueryBuilder('cat')
            .leftJoin('cat.votes', 'vote')
            .addSelect('COUNT(vote.id)', 'vote_count')
            .groupBy('cat.id')
            .orderBy('vote_count', pageOptionsDto.order)
            .where(`cat.id IN (${subQuery.getQuery()})`)

        const raws = await queryBuilder.getRawMany();

        const rankedCatsDto: RankedCatDto[] = raws.map((cat) => {
            return {
                cat : {
                    id: cat.cat_id,
                    name: cat.cat_name,
                    picture: cat.cat_picture
                },
                votesCount: cat.vote_count,
            }
        })

        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return { rankedCatsDto, pageMetaDto };
    }
}
