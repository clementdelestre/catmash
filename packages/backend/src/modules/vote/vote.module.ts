import { Module } from '@nestjs/common';
import { VoteService } from './services/vote.service';
import { VoteController } from './controllers/vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from 'src/shared/entities/cat.entity';
import { VoteEntity } from 'src/shared/entities/vote.entity';

@Module({
  providers: [VoteService],
  controllers: [VoteController],
  imports: [
    TypeOrmModule.forFeature([CatEntity, VoteEntity]),
  ]
})
export class VoteModule {}
