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

  setAllNodekeysToArray(l) {
    return map(i => {
      return this.setNodekysToArray(i);
    }, l);
  }

  setNodekysToArray(i) {
    i.nodekeys = isEmpty(i.nodekeys) ? '' : JSON.parse(i.nodekeys);
    return i;
  }

  setNodekysToString(i) {
    i.nodekeys = isEmpty(i.nodekeys) ? '' : JSON.stringify(i.nodekeys);
    return i;
  }

  async findAll(): Promise<Group[]> {
    const list = await this.rep.find();
    return this.setAllNodekeysToArray(list);
  }

  async findOneById(i): Promise<Group> {
    const item = await this.rep.findOne({ id: i });
    return this.setNodekysToArray(item);
  }

  async findByIds(ids): Promise<Group[]> {
    const list = await this.rep.findByIds(ids);
    return this.setAllNodekeysToArray(list);
  }

  async count(where): Promise<number> {
    return await this.rep.count(where);
  }

  async create(data): Promise<InsertResult> {
    return await this.rep.insert(data);
  }

  async update(id, data): Promise<UpdateResult> {
    return await this.rep.update(id, this.setNodekysToString(data));
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
