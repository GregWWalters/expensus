import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Account } from './Account'
import { Group } from './Group'
import { Transaction } from './Transaction'

@Entity('items')
export class Item extends BaseEntity {
  // === Class properties ===
  @PrimaryGeneratedColumn() id: number

  @Column() accessToken: string

  @Column() institutionId: string

  @Index({ unique: true })
  @Column()
  itemId: string

  @Column() webhook: string

  // === Relationships ===
  @Column() groupId: number
  @ManyToOne(type => Group, group => group.items)
  @JoinColumn()
  group: Group

  @OneToMany(type => Account, account => account.item)
  @JoinColumn()
  accounts: Item[]

  @OneToMany(type => Transaction, transaction => transaction.item)
  @JoinColumn()
  transactions: Transaction[]
}
