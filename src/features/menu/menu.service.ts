import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly rep: Repository<Menu>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return await this.rep.find();
  }

  async findOneById(i): Promise<Menu> {
    return await this.rep.findOne({id: i});
  }

  async findByIds(ids): Promise<Menu[]> {
    return await this.rep.findByIds(ids);
  }

  async count(where): Promise<number> {
    return await this.rep.count(where);
  }

  async create(data): Promise<InsertResult> {
    return await this.rep.insert(data);
  }

  async update(id, data): Promise<UpdateResult> {
    return await this.rep.update(id, data);
  }

  async increment(i: string, col: string, num: number): Promise<void> {
    return await this.rep.increment({id: i}, col, num);
  }

  async decrement(i: string, col: string, num: number): Promise<void> {
    return await this.rep.decrement({id: i}, col, num);
  }

  async delete(ids): Promise<DeleteResult> {
    return await this.rep.delete(ids);
  }
}