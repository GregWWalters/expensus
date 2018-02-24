import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
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

  @ManyToOne(type => Group, group => group.users)
  group: Group
}
