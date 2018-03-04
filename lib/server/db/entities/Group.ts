import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { GroupForClient } from '../../../types/state/group'
import { Item } from './Item'
import { User } from './User'

@Entity('groups')
export class Group extends BaseEntity {
  // === Class properties ===
  @PrimaryGeneratedColumn() id: number

  @Column() name: string

  // === Relationships ===
  @Column({ nullable: true })
  ownerId: number
  @OneToOne(type => User, { eager: true })
  @JoinColumn()
  owner: User

  @OneToMany(type => User, user => user.group, { eager: true })
  users: User[]

  @OneToMany(type => Item, item => item.group)
  items?: Item[]

  // === Class Methods ===
  toObjectForClient(): GroupForClient {
    return {
      id: this.id,
      name: this.name,
      owner: this.owner.toObjectForClient(),
      users: this.users.map(user => user.toObjectForClient()),
    }
  }
}
