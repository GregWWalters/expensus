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
  // === Class properties ===
  @PrimaryGeneratedColumn() id: number

  @Column() firstName: string

  @Column() lastName: string

  @Column({ unique: true })
  email: string

  @Column({ type: 'json', nullable: true })
  passwordHash: string

  // === Relationships ===
  @Column({ nullable: true })
  groupId: number | null
  @ManyToOne(type => Group, group => group.users)
  @JoinColumn()
  group?: Group

  toObjectForClient(): UserForClient {
    return {
      email: this.email,
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      groupId: this.groupId,
    }
  }
}
