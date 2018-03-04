import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Account } from './Account'
import { Item } from './Item'

@Entity('transactions')
export class Transaction extends BaseEntity {
  // === Class properties ===
  @PrimaryGeneratedColumn() id: number

  @Index({ unique: true })
  @Column()
  transactionId: string

  @Column() amount: number

  // TODO: Category -> when we setup a category table, create relationship here
  @Column('json') category: string[]
  @Column() categoryId: string

  @Column() date: string

  @Column('json') location: Plaid.Location

  @Column() name: string

  @Column('json') paymentMeta: object

  @Column() pending: boolean

  @Column({ type: 'varchar', nullable: true })
  pendingTransactionId: string | null

  @Column({ type: 'varchar', nullable: true })
  accountOwner: string | null

  @Column('varchar') transactionType: Plaid.TransactionType

  // === Relationships ===
  @Column() accountId: number
  @ManyToOne(type => Account, account => account.transactions)
  @JoinColumn()
  account?: Account

  @Column() itemId: number
  @ManyToOne(type => Item, item => item.transactions)
  @JoinColumn()
  item?: Item
}
