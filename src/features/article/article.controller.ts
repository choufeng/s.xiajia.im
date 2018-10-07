import { Controller, Get, Query, Param, Body, Post, Put, Patch, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import * as R from 'ramda';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

@Controller('article')
export class ArticleController {
  constructor(private readonly service: ArticleService) {}

  @Get()
  findAll(@Query() query): Promise<Article[]> {
    const w = R.isNil(query.where) ? {} : JSON.parse(query.where);
    const limit = R.isNil(query.limit) ? 15 : query.limit;
    const offset = R.isNil(query.page) ? 0 : R.multiply(query.page, limit);
    return this.service.findAll(w, limit, offset);
  }

  @Get('/count')
  count(@Query() query): Promise<number> {
    const w = R.isNil(query.where) ? {} : JSON.parse(query.where);
    return this.service.count(w);
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: string): Promise<Article> {
    return this.service.findOneById(id);
  }

  @Get('/ids/:ids')
  findByIds(@Param('ids') ids: string): Promise<Article[]> {
    const idArray = ids.split(',');
    return this.service.findByIds(idArray);
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