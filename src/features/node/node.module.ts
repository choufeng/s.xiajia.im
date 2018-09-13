import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './node.entity';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Node])],
  providers: [NodeService],
  controllers: [NodeController],
})
export class NodeModule {}
