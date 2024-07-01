import { ClassSerializerInterceptor, Controller, Get, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { VoteService } from '../services/vote.service';

@Controller('vote')
@UseInterceptors(ClassSerializerInterceptor)
export class VoteController {

    constructor(private voteService: VoteService) {}

    @Get('candidates')
    async getCandidates(@Req() req: any) {
        return this.voteService.getCandidates();
    }

    @Post(':cat')
    async vote(@Req() req: any, @Param('cat') catId: number){
        return this.voteService.vote(catId);
    }

}
