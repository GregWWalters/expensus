import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CategoryForClient } from '../../../types/state/category'
import { Group } from './Group'

@Entity('categories')
export class Category extends BaseEntity {
  // === Class Properties ===
  @PrimaryGeneratedColumn() id: number

  @Column({ type: 'varchar' })
  name: string

  // === Relations ===
  @Column() groupId: number
  @ManyToOne(type => Group, group => group.categories)
  group: Group

  @Column() parentId: number | null
  @ManyToOne(type => Category, category => category.children, {
    nullable: true,
  })
  parent: Category | null

  @OneToMany(type => Category, category => category.parent, { eager: true })
  children: Category[]

  // === Class Methods ===
  toObjectForClient(): CategoryForClient {
    return {
      childrenIds: this.children.map(category => category.id),
      id: this.id,
      name: this.name,
      parentId: this.parentId,
    }
  }
}
