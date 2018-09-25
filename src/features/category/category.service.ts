import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { getManager, Repository, TreeRepository, UpdateResult, DeleteResult } from 'typeorm';
import { NO_THIS_NODE, NO_REMOVE_CATEGORY } from 'common/errorcode.const';
import { isNil } from 'ramda';
import { REMOVE_TREE_NAME } from 'common/consts';
import { log } from 'util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly rep: Repository<Category>,
    @InjectRepository(Category) private readonly repTree: TreeRepository<Category>,
  ) {}

  async getAllTrees(): Promise<any> {
    return this.repTree.findTrees();
  }

  async getRoots(): Promise<Category[]> {
    return this.repTree.findRoots();
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

  async delete(cid): Promise<any> {
    // 设计目标为把节点移动到一个专用的移除树
    // 1. 找出移除树`已删除`
    // 2. 把目标树移动到该节点下
    const removeTree = await this.rep.findOne({name: REMOVE_TREE_NAME});
    if (isNil(removeTree)) {
      throw new HttpException(`${NO_REMOVE_CATEGORY}:${REMOVE_TREE_NAME}`, HttpStatus.BAD_REQUEST);
    }
    const node = await this.getNodeById(cid);
    node.parent = removeTree;
    return await this.repTree.update(cid, node);
  }

}