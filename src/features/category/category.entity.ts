import { Entity, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, Tree } from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  sort: number;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}