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

  @Column({ length: 100 })
  description: string;

  @Column('text')
  nodekeys: string;

  @Column()
  status: boolean;

  @Column('int')
  sort: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(type => Manager, manager => manager.group)
  managers: Manager[];
}
