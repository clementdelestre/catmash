import { Module } from '@nestjs/common';
import { ScoreController } from './controllers/score.controller';
import { ScoreService } from './services/score.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from 'src/shared/entities/cat.entity';
import { VoteEntity } from 'src/shared/entities/vote.entity';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService],
  imports: [
    TypeOrmModule.forFeature([CatEntity, VoteEntity]),
  ]
})
export class ScoreModule {}
