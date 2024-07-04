import { Controller, Get, Query } from '@nestjs/common';
import { ScoreService } from '../services/score.service';
import { PaginationTransformPipe } from 'src/shared/pipes/pagination.pipe';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { PageDto } from 'src/shared/dto/page.dto';
import { FiltersDto } from '../dto/filters.dto';

@Controller('score')
export class ScoreController {

    constructor(private readonly scoreService: ScoreService) {}

    @Get()
    async getScore(@Query(new PaginationTransformPipe()) pagination: PageOptionsDto, @Query() filters: FiltersDto ) {
        const score = await this.scoreService.getScore(pagination, filters);
        return new PageDto(score.rankedCatsDto, score.pageMetaDto);
    }

    @Get('novote')
    async getNoVote(@Query(new PaginationTransformPipe()) pagination: PageOptionsDto) {
        const score = await this.scoreService.getNoVote(pagination);
        return new PageDto(score.rankedCatsDto, score.pageMetaDto);
    }

}
