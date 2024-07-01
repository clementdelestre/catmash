import { Module } from '@nestjs/common';
import { VoteModule } from './modules/vote/vote.module';
import { ScoreModule } from './modules/score/score.module';
import { DatabaseModule } from './modules/common/database/database.module';
import { CatModule } from './modules/cat/cat.module';

@Module({
  imports: [
    DatabaseModule,
    VoteModule,
    ScoreModule,
    CatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
