import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import GroupState from '../../../types/state/group'
import { User } from './User'

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() name: string

  @OneToOne(type => User)
  @JoinColumn()
  owner: User

  @OneToMany(type => User, user => user.group)
  users: User[]

  toObjectForClient(): GroupState {
    return {
      id: this.id,
      name: this.name,
      owner: this.owner.toObjectForClient(),
      users: this.users.map(user => user.toObjectForClient()),
    }
  }
}
