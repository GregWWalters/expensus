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
import { ItemForClient } from '../../../types/state/item'
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
  group?: Group

  // Likely that we'll always want to have accounts with the Item
  // so going to eager-load them
  @OneToMany(type => Account, account => account.item, { eager: true })
  @JoinColumn()
  accounts: Account[]

  @OneToMany(type => Transaction, transaction => transaction.item)
  @JoinColumn()
  transactions?: Transaction[]

  // === Class Methods ===
  toObjectForClient(): ItemForClient {
    return {
      id: this.id,
      itemId: this.itemId,
      groupId: this.groupId,
      institutionId: this.institutionId,
      accounts: this.accounts,
    }
  }
}
