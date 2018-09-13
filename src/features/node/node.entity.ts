import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Node extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  category: string;

  @Column({ length: 50 })
  nodekey: string;

  @Column({ length: 100 })
  uri: string;

  @Column('int')
  sort: number;
}
