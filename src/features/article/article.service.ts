import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(Article) private readonly rep: Repository<Article>){}

  async findAll(where, limit, offset): Promise<Article[]> {
    return await this.rep.find({
      where,
      take: limit,
      skip: offset,
      order: {
        id: 'DESC',
      },
      relations: ['categorys'],
    });
  }

  async findOneById(aid: string): Promise<Article> {
    return await this.rep.findOne({id: aid});
  }

  async findByIds(ids): Promise<Article[]> {
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
    return await this.rep.increment({ id: i }, col, num);
  }

  async decrement(i: string, col: string, num: number): Promise<void> {
    return await this.rep.decrement({ id: i}, col, num);
  }

  async delete(ids): Promise<DeleteResult> {
    return await this.rep.delete(ids);
  }
}