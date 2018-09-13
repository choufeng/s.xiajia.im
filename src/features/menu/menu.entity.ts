import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  pid: string;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 50 })
  description: string;

  @Column({ length: 20 })
  icon: string;

  @Column({ length: 20 })
  category: string;

  @Column({ length: 200 })
  uri: string;

  @Column({ length: 20 })
  rule: string;

  @Column('int')
  sort: number;
}
