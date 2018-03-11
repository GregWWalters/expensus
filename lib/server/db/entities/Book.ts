import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Allocation } from './Allocation'
import { Group } from './Group'

@Entity('books')
export class Book extends BaseEntity {
  // === Class Properties ===
  @PrimaryGeneratedColumn() id: number

  @Column({ type: 'varchar' })
  name: string

  // === Relations ===
  @Column() groupId: number
  @ManyToOne(type => Group, group => group.books)
  group: Group

  @Column() allocationId: number
  @OneToMany(type => Allocation, allocation => allocation.book)
  allocations?: Allocation[]
}
