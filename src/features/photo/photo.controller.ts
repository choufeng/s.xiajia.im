import {Get, Delete, Controller, Param, Patch, Body, Put, Post, UseGuards} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import { DeleteResult, UpdateResult, InsertResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('photo')
export class PhotoController {
  constructor(private readonly service: PhotoService) {}

  @Post()
  create(@Body() data): Promise<InsertResult> {
    return this.service.insert(data);
  }

  @Get()
  @UseGuards(AuthGuard())
  root(): Promise<Photo[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  getById(@Param('id') id): Promise<Photo> {
    return this.service.findOne(id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id): Promise<DeleteResult> {
    return this.service.remove(id);
  }

  @Patch('/:id')
  PatchById(@Param('id') id, @Body() data): Promise<UpdateResult> {
    return this.service.update(id, data);
  }

  @Put('/:id')
  PutById(@Param('id') id, @Body() data): Promise<UpdateResult> {
    return this.service.update(id, data);
  }

  // @Get('/count')
  // Count(@Param('where') where): Promise<Int> {
  //   return this.service.count(where);
  // }

}
