import {
  Injectable,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import {
  getManager,
  Repository,
  TreeRepository,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import { NO_THIS_NODE, NO_REMOVE_CATEGORY } from 'common/errorcode.const';
import { isNil, not } from 'ramda';
import { REMOVE_TREE_NAME } from 'common/consts';
import { log } from 'util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly rep: Repository<Category>,
    @InjectRepository(Category)
    private readonly repTree: TreeRepository<Category>,
  ) {}

  async getAllTrees(): Promise<any> {
    return this.repTree.findTrees();
  }

  async getRoots(): Promise<Category[]> {
    return this.repTree.findRoots();
  }

  async getNodeById(cid: number): Promise<Category> {
    const node = await this.rep.findOne({ id: cid });
    if (isNil(node)) {
      throw new HttpException(
        `${NO_THIS_NODE}, id: ${cid}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return node;
  }

  /**
   * 在nest-ed模式下，这个是无效的
   */
  async getChildrenById(cid: number): Promise<Category[]> {
    const node = await this.getNodeById(cid);
    if (isNil(node)) {
      throw new HttpException(
        `${NO_THIS_NODE}, id: ${cid}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repTree.findDescendants(node);
  }

  async getChildrenTreeById(cid: number): Promise<Category> {
    const node = await this.getNodeById(cid);
    if (isNil(node)) {
      throw new HttpException(
        `${NO_THIS_NODE}, id: ${cid}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repTree.findDescendantsTree(node);
  }

  async getParentById(cid: number): Promise<Category[]> {
    const node = await this.getNodeById(cid);
    if (isNil(node)) {
      throw new HttpException(
        `${NO_THIS_NODE}, id: ${cid}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repTree.findAncestors(node);
  }

  async getParentTreeById(cid: number): Promise<Category> {
    const node = await this.getNodeById(cid);
    if (isNil(node)) {
      throw new HttpException(
        `${NO_THIS_NODE}, id: ${cid}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.repTree.findAncestorsTree(node);
  }

  async create(data): Promise<Category> {
    const category = new Category();
    category.name = data.name;
    category.description = data.description;
    category.sort = data.sort;
    if (data.parent === 0) {
      category.parent = null;
    } else {
      category.parent = await this.getNodeById(data.parent);
    }
    return await this.rep.save(category);
  }

  async update(cid, data): Promise<Category> {
    const category = await this.getNodeById(cid);
    category.name = data.name;
    category.description = data.description;
    category.sort = data.sort;
    if (data.parent === 0) {
      category.parent = null;
    } else if (data.parent) {
      category.parent = await this.getNodeById(data.parent);
    }
    return await this.rep.save(category);
  }

  async delete(cid): Promise<any> {
    // 设计目标为把节点移动到一个专用的移除树
    // 1. 找出移除树`已删除`
    // 2. 把目标树移动到该节点下
    const removeTree = await this.rep.findOne({ name: REMOVE_TREE_NAME });
    if (isNil(removeTree)) {
      throw new HttpException(
        `${NO_REMOVE_CATEGORY}:${REMOVE_TREE_NAME}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const node = await this.getNodeById(cid);
    node.parent = removeTree;
    return await this.rep.save(node);
  }

  async getRemoveCategory(): Promise<Category> {
    const node = await this.rep.findOne({ name: REMOVE_TREE_NAME });
    if (isNil(node)) {
      throw new HttpException(
        `${NO_THIS_NODE}: ${REMOVE_TREE_NAME}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return node;
  }

  async initDatabase(): Promise<any> {
    // 检查是否有这个分类
    // log('节点1');
    // const hasOne = await this.rep.findOne({ name: REMOVE_TREE_NAME });
    // log('节点1.1');
    // if (not(isNil(hasOne))) {
    //   log('节点1.2');
    //   throw new HttpException(
    //     `已经初始化过, 无需再次执行!`,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    log('节点2');
    // 存入标准的已删除分类
    const category = new Category();
    category.name = REMOVE_TREE_NAME;
    category.description = '这里负责保留所有从其他分类移除的分类';
    category.sort = 0;
    return this.rep.save(category);
  }
}
