import { Transaction as PlaidTransaction } from 'plaid'
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
import { TransactionForClient } from '../../../types/state/transaction'
import AccountRequiredError from '../../errors/AccountRequiredError'
import { Account } from './Account'
import { Allocation } from './Allocation'
import { Item } from './Item'

@Entity('transactions')
export class Transaction extends BaseEntity {
  // === Statics ===
  static async createTransactionFromPlaidApi(transaction: PlaidTransaction) {
    const account = await Account.findOne({
      where: { accountId: transaction.account_id },
    })
    if (!account) {
      throw new AccountRequiredError(
        `Account not found for transaction: ${transaction.transaction_id}`
      )
    }
    const txn =
      (await Transaction.findOne({
        where: { transactionId: transaction.transaction_id },
      })) || new Transaction()
    txn.transactionId = transaction.transaction_id
    txn.amount = transaction.amount
    txn.category = transaction.category
    txn.categoryId = transaction.category_id
    txn.date = transaction.date
    txn.location = transaction.location
    txn.name = transaction.name
    txn.paymentMeta = transaction.payment_meta
    txn.pending = transaction.pending
    txn.pendingTransactionId = transaction.pending_transaction_id
    txn.accountOwner = transaction.account_owner
    txn.transactionType = transaction.transaction_type as Plaid.TransactionType | null
    txn.accountId = account.id
    txn.itemId = account.itemId
    await txn.save()
    return txn
  }

  static async createTransactionsFromPlaidApi(
    transactions: ReadonlyArray<PlaidTransaction>
  ) {
    return Promise.all(
      transactions.map(txn => this.createTransactionFromPlaidApi(txn))
    )
  }

  // === Class properties ===
  @PrimaryGeneratedColumn() id: number

  @Index({ unique: true })
  @Column()
  transactionId: string

  @Column({ type: 'double precision', nullable: true })
  amount: number | null

  // TODO: Category -> when we setup a category table, create relationship here
  @Column({ type: 'json', nullable: true })
  category: string[] | null

  @Column({ type: 'varchar', nullable: true })
  categoryId: string | null

  @Column() date: string

  @Column('json') location: Plaid.Location

  @Column({ type: 'varchar', nullable: true })
  name: string | null

  @Column('json') paymentMeta: object

  @Column({ type: 'boolean', nullable: true })
  pending: boolean | null

  @Column({ type: 'varchar', nullable: true })
  pendingTransactionId: string | null

  @Column({ type: 'varchar', nullable: true })
  accountOwner: string | null

  @Column({ type: 'varchar', nullable: true })
  transactionType: Plaid.TransactionType | null

  // === Relationships ===
  @Column() accountId: number
  @ManyToOne(type => Account, account => account.transactions)
  @JoinColumn()
  account?: Account

  @Column() itemId: number
  @ManyToOne(type => Item, item => item.transactions)
  @JoinColumn()
  item?: Item

  @OneToMany(type => Allocation, allocation => allocation.transaction, {
    eager: true,
  })
  allocations?: Allocation[]

  // === Helper Methods ===
  toObjectForClient(): TransactionForClient {
    return {
      id: this.id,
      transactionId: this.transactionId,
      amount: this.amount,
      category: this.category,
      categoryId: this.categoryId,
      date: this.date,
      location: this.location,
      name: this.name,
      paymentMeta: this.paymentMeta,
      pending: this.pending,
      pendingTransactionId: this.pendingTransactionId,
      accountOwner: this.accountOwner,
      transactionType: this.transactionType,
      accountId: this.accountId,
      itemId: this.itemId,
      allocations: (this.allocations || []).map(al => al.toObjectForClient()),
    }
  }
}
