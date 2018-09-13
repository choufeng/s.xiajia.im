import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  getConnection,
  DeleteResult,
  UpdateResult,
  InsertResult,
} from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  async findOne(photoId): Promise<Photo> {
    return await this.photoRepository.findOne({ id: photoId });
  }

  async remove(photoId): Promise<DeleteResult> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Photo)
      .where('id = :id', { id: photoId })
      .execute();
  }

  async update(photoId, data): Promise<UpdateResult> {
    return await getConnection()
      .createQueryBuilder()
      .update(Photo)
      .set(data)
      .where('id = :id', { id: photoId })
      .execute();
  }

  async insert(data): Promise<InsertResult> {
    return await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Photo)
      .values(data)
      .execute();
  }
}
