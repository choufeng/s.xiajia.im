import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { Manager } from './manager.entity';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { isNil } from 'ramda';
import { EncodePasswordPipe } from 'common/auth/encode-password.pipe';

@Controller('manager')
export class ManagerController {
  constructor(private readonly service: ManagerService) {}

  @Get()
  findAll(): Promise<Manager[]> {
    return this.service.findAll();
  }

  @Get('/id/:id')
  findOneById(@Param('id') id: number): Promise<Manager> {
    return this.service.findOneById(id);
  }

  @Get('/ids/:ids')
  findByIds(@Param('ids') ids: string): Promise<Manager[]> {
    const idArray = ids.split(',');
    return this.service.findByIds(idArray);
  }

  @Get('/count')
  count(@Query() query): Promise<number> {
    const w = isNil(query.where) ? {} : JSON.parse(query.where);
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

  @Patch('/reset-password/:id')
  resetPassword(@Param('id') id, @Body('password', new EncodePasswordPipe()) password): Promise<any> {
    return this.service.resetPassword(id, password);
  }
}
