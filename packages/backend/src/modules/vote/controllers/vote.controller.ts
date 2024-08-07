import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { VoteService } from '../services/vote.service';

@Controller('vote')
@UseInterceptors(ClassSerializerInterceptor)
export class VoteController {

    constructor(private voteService: VoteService) {}

    @Get('candidates')
    async getCandidates(@Req() req: any) {
        return this.voteService.getCandidates();
    }

    @Post()
    async vote(@Req() req: any, @Body('catId') catId: number){
        return this.voteService.vote(catId);
    }

}
