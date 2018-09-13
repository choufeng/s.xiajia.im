import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { map, isEmpty } from 'ramda';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly rep: Repository<Group>,
  ) {}

  setNodekeysToArray(l) {
    return map(i => {
      i.nodekeys = isEmpty(i.nodekeys) ? [] : JSON.parse(i.nodekeys);
      return i;
    }, l);
  }

  async findAll(): Promise<Group[]> {
    const list = await this.rep.find();
    return this.setNodekeysToArray(list);
  }

  async findOneById(i): Promise<Group> {
    return await this.rep.findOne({ id: i });
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
    return await this.rep.increment({ id: i }, col, num);
  }

  async decrement(i: number, col: string, num: number): Promise<void> {
    return await this.rep.decrement({ id: i }, col, num);
  }

  async delete(ids): Promise<DeleteResult> {
    return await this.rep.delete(ids);
  }
}
