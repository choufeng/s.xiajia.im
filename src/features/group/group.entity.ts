import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Manager } from '../manager/manager.entity';

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column('text', { nullable: true, default: '' })
  nodekeys: string;

  @Column({ default: true })
  status: boolean;

  @Column('int', { default: 0 })
  sort: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(type => Manager, manager => manager.group)
  managers: Manager[];
}
