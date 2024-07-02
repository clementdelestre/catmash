import { Controller, Get, Header, NotFoundException, Param, Query, StreamableFile } from '@nestjs/common';
import { ScoreService } from '../services/score.service';
import { PaginationTransformPipe } from 'src/shared/pipes/pagination.pipe';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { PageDto } from 'src/shared/dto/page.dto';



@Controller('score')
export class ScoreController {

    constructor(private readonly scoreService: ScoreService) {}

    @Get()
    async getScore(@Query(new PaginationTransformPipe()) pagination: PageOptionsDto) {
        const score = await this.scoreService.getScore(pagination);
        return new PageDto(score.rankedCatsDto, score.pageMetaDto);
    }

}
