import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() name: string

  @OneToOne(type => User)
  @JoinColumn()
  founder: User

  @OneToMany(type => User, user => user.group)
  users: User[]
}
