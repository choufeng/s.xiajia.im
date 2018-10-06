import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Article {

  @PrimaryGeneratedColumn()
  id: string;

  @Column({length: 200})
  title: string;

  @Column('text')
  link: string;

  @Column('text')
  content: string;

  @Column({default: 0})
  status: number;

  @CreateDateColumn()
  created: Date;

  @ManyToMany(type => Category)
  @JoinTable()
  categorys: Category[];
}