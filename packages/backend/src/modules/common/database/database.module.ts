import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: ['error', 'query'],
      cache: false,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}