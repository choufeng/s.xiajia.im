import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly rep: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return await this.rep.find();
  }

  async findOneById(i): Promise<Group> {
    return await this.rep.findOne({id: i});
  }

  async findByIds(ids): Promise<Group[]> {
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

  async increment(i: number, col: string, num: number): Promise<void> {
    return await this.rep.increment({id: i}, col, num);
  }

  async decrement(i: number, col: string, num: number): Promise<void> {
    return await this.rep.decrement({id: i}, col, num);
  }

  async delete(ids): Promise<DeleteResult> {
    return await this.rep.delete(ids);
  }
}