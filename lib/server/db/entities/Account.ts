import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AccountForClient } from '../../../types/state/item'
import { Item } from './Item'
import { Transaction } from './Transaction'

@Entity('accounts')
export class Account extends BaseEntity {
  // === Class properties ===
  @PrimaryGeneratedColumn() id: number

  @Column() accountId: string

  @Column('json') balances: Plaid.AccountBalances

  @Column({ type: 'varchar', nullable: true })
  mask: string | null

  @Column({ type: 'varchar', nullable: true })
  name: string | null

  @Column({ type: 'varchar', nullable: true })
  officialName: string | null

  @Column({ type: 'varchar', nullable: true })
  type: Plaid.AccountType | null

  @Column({ type: 'varchar', nullable: true })
  subtype: Plaid.AccountSubtype | null

  // === Relationships ===
  @Column() itemId: number
  @ManyToOne(type => Item, item => item.accounts)
  @JoinColumn()
  item?: Item

  @OneToMany(type => Transaction, transaction => transaction.account)
  @JoinColumn()
  transactions?: Transaction[]

  toAccountForClient(): AccountForClient {
    return {
      accountId: this.accountId,
      balances: this.balances,
      id: this.id,
      mask: this.mask,
      name: this.name,
      officialName: this.officialName,
      type: this.type,
      subtype: this.subtype,
      itemId: this.itemId,
    }
  }
}
