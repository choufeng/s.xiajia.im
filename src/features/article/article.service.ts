import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { log } from 'util';
import { Category } from '../category/category.entity';
import { assoc } from 'ramda';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly rep: Repository<Article>,
    @InjectRepository(Article) private readonly categoryRep: Repository<Category>,
  ){}

  async findAll(where, limit, offset): Promise<Article[]> {
    return await this.rep.find({
      where,
      take: limit,
      skip: offset,
      order: {
        id: 'DESC',
        title: 'ASC',
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
    const list = await this.categoryRep.findByIds(data.categorys);
    return await this.rep.save(assoc('categorys', list, data));
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