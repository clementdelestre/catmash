import { Module } from '@nestjs/common';
import { VoteModule } from './modules/vote/vote.module';
import { ScoreModule } from './modules/score/score.module';
import { DatabaseModule } from './modules/common/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    VoteModule,
    ScoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
