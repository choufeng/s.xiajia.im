import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get()
  getAllTrees(): Promise<any> {
    return this.service.getAllTrees();
  }

  @Get('/remove-root')
  getRemoveRoot(): Promise<Category> {
    return this.service.getRemoveCategory();
  }

  @Get('/roots')
  getRoots(): Promise<any> {
    return this.service.getRoots();
  }

  @Get('/:id')
  getNodeById(@Param('id') id): Promise<Category> {
    return this.service.getNodeById(id);
  }

  @Get('/:id/children')
  getChildrenById(@Param('id') id): Promise<Category[]> {
    return this.service.getChildrenById(id);
  }

  @Get('/:id/children-tree')
  getChildrenTreeById(@Param('id') id): Promise<Category> {
    return this.service.getChildrenTreeById(id);
  }

  @Get('/:id/parent')
  getParentById(@Param('id') id): Promise<Category[]> {
    return this.service.getParentById(id);
  }

  @Get('/:id/parent-tree')
  getParentTreeById(@Param('id') id): Promise<Category> {
    return this.service.getParentTreeById(id);
  }

  @Post()
  create(@Body() data): Promise<Category> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(@Body() data, @Param('id') id): Promise<UpdateResult> {
    return this.service.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.service.delete(id);
  }

  @Post('/init-db')
  initDatabase(): Promise<any> {
    return this.service.initDatabase();
  }

}