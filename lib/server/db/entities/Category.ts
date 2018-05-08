import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CategoryForClient } from '../../../types/state/category'
import { Group } from './Group'

@Entity('categories')
@Index(['parentId', 'name'], { unique: true })
export class Category extends BaseEntity {
  static async findWithChildrenForGroup(
    group: Group
  ): Promise<CategoryWithChildren[]> {
    return (await Category.createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'child')
      .where('category.groupId = :groupId', { groupId: group.id })
      .getMany()) as CategoryWithChildren[]
  }

  static async findWithChildrenById(
    id: number
  ): Promise<CategoryWithChildren | undefined> {
    return (await Category.findOne(id, { relations: ['children'] })) as
      | CategoryWithChildren
      | undefined
  }

  // === Class Properties ===
  @PrimaryGeneratedColumn() id: number

  @Column({ type: 'varchar' })
  name: string

  // === Relations ===
  @Column() groupId: number
  @ManyToOne(type => Group, group => group.categories)
  group: Group

  @Column({ nullable: true })
  parentId: number | null
  @ManyToOne(type => Category, category => category.children, {
    nullable: true,
  })
  parent: Category | null

  @OneToMany(type => Category, category => category.parent)
  children?: Category[]

  // === Class Methods ===
  toObjectForClient(this: CategoryWithChildren): CategoryForClient {
    return {
      childrenIds: this.children.map(category => category.id),
      id: this.id,
      name: this.name,
      parentId: this.parentId,
    }
  }
}

interface CategoryWithChildren extends Category {
  children: Category[]
}
