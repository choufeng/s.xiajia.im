import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Node } from './node.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { NO_THIS_USER } from 'common/errorcode.const';
// import { isNil, isEmpty, either, ifElse } from 'ramda';

@Injectable()
export class NodeService {
  constructor(@InjectRepository(Node) private readonly rep: Repository<Node>) {}

  async findAll(): Promise<Node[]> {
    return await this.rep.find();
  }

  async findOneById(i): Promise<Node> {
    return await this.rep.findOne({ id: i });
  }

  async findByIds(ids): Promise<Node[]> {
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
