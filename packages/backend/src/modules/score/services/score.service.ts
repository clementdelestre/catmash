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

        const queryBuilder = this.voteRepo.createQueryBuilder('vote')
            .select('cat.id', 'cat_id')
            .addSelect('cat.name', 'cat_name')
            .addSelect('cat.picture', 'cat_picture')
            .addSelect('COUNT(vote.catId)', 'vote_count')
            .leftJoin('vote.cat', 'cat')
            .groupBy('vote.catId')
            .addGroupBy('cat.id')
            .orderBy('COUNT(vote.catId)', pageOptionsDto.order)
            .addOrderBy('cat.id', 'DESC')
            .offset(pageOptionsDto.skip)
            .limit(pageOptionsDto.take)

            .where('1=1')
            if(filters.startAt){
                queryBuilder.andWhere(`vote.date >= '${filters.startAt}'`)
            }
            if(filters.endAt){
                queryBuilder.andWhere(`vote.date <= '${filters.endAt}'`)
            }

        const raws = await queryBuilder.getRawMany();
        const itemCount = await queryBuilder.getCount();

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

    async getNoVote(pageOptionsDto: PageOptionsDto){

        const queryBuilder = this.catRepo.createQueryBuilder('cat')
            .select(['cat.id', 'cat.name', 'cat.picture'])
            .leftJoin('cat.votes', 'votes')
            .loadRelationCountAndMap('cat.count', 'cat.votes')
            .where('votes.id IS NULL')
            .offset(pageOptionsDto.skip)
            .limit(pageOptionsDto.take)

        const [cats, count] = await queryBuilder.getManyAndCount();

        console.log(cats);

        const rankedCatsDto: RankedCatDto[] = cats.map((cat) => {
            return {
                cat : cat,
                votesCount: count,
            }
        })

        const itemCount = await queryBuilder.getCount();
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

        return { rankedCatsDto, pageMetaDto };
    }
}
