import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './manager.entity';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  providers: [ManagerService],
  controllers: [ManagerController],
})

export class ManagerModule{}
