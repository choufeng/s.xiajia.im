import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './group.entity';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import * as R from 'ramda';
import { log } from 'util';
import { JsonWebTokenError } from 'jsonwebtoken';

@Controller('group')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Get()
  findAll(): Promise<Group[]> {
    return this.service.findAll();
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: number): Promise<Group> {
    return this.service.findOneById(id);
  }

  @Get('/ids/:ids')
  findByIds(@Param('ids') ids: string): Promise<Group[]> {
    const idArray = ids.split(',');
    return this.service.findByIds(idArray);
  }

  @Get('/count')
  count(@Query() query): Promise<number> {
    const w = R.isNil(query.where) ? {} : JSON.parse(query.where);
    return this.service.count(w);
  }

  @Post()
  create(@Body() data): Promise<InsertResult> {
    return this.service.create(data);
  }

  @Put('/:id')
  patch(@Body() data, @Param('id') id): Promise<UpdateResult> {
    return this.service.update(id, data);
  }

  @Patch('/increment/:id/:column/:num')
  increment(@Param() p): Promise<void> {
    return this.service.increment(p.id, p.column, p.num);
  }

  @Patch('/decrement/:id/:column/:num')
  decrement(@Param() p): Promise<void> {
    return this.service.decrement(p.id, p.column, p.num);
  }

  @Delete('/:ids')
  delete(@Param('ids') ids): Promise<DeleteResult> {
    const data = ids.split(',');
    return this.service.delete(data);
  }
}
