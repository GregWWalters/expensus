import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserForClient } from '../../../types/state/user'
import { Group } from './Group'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() firstName: string

  @Column() lastName: string

  @Column({ unique: true })
  email: string

  @Column({ type: 'json', nullable: true })
  passwordHash: string

  @Column({ nullable: true })
  groupId: number

  @ManyToOne(type => Group, group => group.users)
  @JoinColumn()
  group: Group

  toObjectForClient(): UserForClient {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      groupId: this.groupId,
    }
  }
}
