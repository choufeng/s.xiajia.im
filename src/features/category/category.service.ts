import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { getManager, Repository, TreeRepository, UpdateResult, DeleteResult } from 'typeorm';
import { NO_THIS_NODE } from 'common/errorcode.const';
import { isNil } from 'ramda';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly rep: Repository<Category>,
    @InjectRepository(Category) private readonly repTree: TreeRepository<Category>,
  ) {}

  async getAllTrees(): Promise<any> {
    return this.repTree.findTrees();
  }

  async getNodeById(cid: number): Promise<Category> {
    const node = await this.rep.findOne({id: cid});
    if (isNil(node)) {
      throw new HttpException(`${NO_THIS_NODE}, id: ${cid}`, HttpStatus.BAD_REQUEST);
    }
    return node;
  }

  async getChildrenById(cid: number): Promise<Category[]> {
    const node = await this.getNodeById(cid);
    if (isNil(node)) {
      throw new HttpException(`${NO_THIS_NODE}, id: ${cid}`, HttpStatus.BAD_REQUEST);
    }
    return await this.repTree.findDescendants(node);
  }

  async getChildrenTreeById(cid: number): Promise<Category> {
    const node = await this.getNodeById(cid);
    if (isNil(node)) {
      throw new HttpException(`${NO_THIS_NODE}, id: ${cid}`, HttpStatus.BAD_REQUEST);
    }
    return await this.repTree.findDescendantsTree(node);
  }

  async getParentById(cid: number): Promise<Category[]> {
    const node = await this.getNodeById(cid);
    if (isNil(node)) {
      throw new HttpException(`${NO_THIS_NODE}, id: ${cid}`, HttpStatus.BAD_REQUEST);
    }
    return await this.repTree.findAncestors(node);
  }

  async getParentTreeById(cid: number): Promise<Category> {
    const node = await this.getNodeById(cid);
    if (isNil(node)) {
      throw new HttpException(`${NO_THIS_NODE}, id: ${cid}`, HttpStatus.BAD_REQUEST);
    }
    return await this.repTree.findAncestorsTree(node);
  }

  async create(data): Promise<Category> {
    const category = new Category();
    category.name = data.name;
    category.description = data.description;
    if (data.parent) {
      category.parent = await this.getNodeById(data.parent);
    }
    return await this.rep.save(category);
  }

  async update(cid, data): Promise<UpdateResult> {
    return await this.repTree.update(cid, data);
  }

  async delete(cid): Promise<DeleteResult> {
    return await this.repTree.delete(cid);
  }

}