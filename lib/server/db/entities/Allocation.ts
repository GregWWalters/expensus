import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Book } from './Book'
import { Transaction } from './Transaction'

@Entity('allocations')
export class Allocation extends BaseEntity {
  // === Class Properties ===
  @PrimaryGeneratedColumn() id: number

  @Column('double precision') amount: number

  // === Relations ===
  @Column() transactionId: number
  @ManyToOne(type => Transaction, transaction => transaction.allocations)
  transaction?: Transaction

  @Column() bookId: number
  @ManyToOne(type => Book, book => book.allocations)
  book?: Book
}
