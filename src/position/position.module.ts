import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Position } from './position.model';

@Module({
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService],
  imports: [SequelizeModule.forFeature([Position])],
})
export class PositionModule {}
