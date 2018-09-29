import { Entity, PrimaryGeneratedColumn, Column, TreeChildren, TreeParent, Tree, ManyToOne, OneToMany } from 'typeorm';

@Entity()
// @Tree('closure-table')
@Tree('nested-set')
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

  // @ManyToOne(type => Category, category => category.children)
  // parent: Category;

  // @OneToMany(type => Category, category => category.parent)
  // children: Category[];
}