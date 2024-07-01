import { Module } from '@nestjs/common';
import { CatController } from './controllers/cat.controller';
import { CatService } from './services/cat.service';
import { CatEntity } from 'src/shared/entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CatController],
  providers: [CatService],
  imports: [
    TypeOrmModule.forFeature([CatEntity]),
  ]
})
export class CatModule {}
