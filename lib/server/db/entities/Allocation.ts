import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { AllocationForClient } from '../../../types/Allocation'
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

  // === Helper Methods ===
  toObjectForClient(): AllocationForClient {
    return {
      id: this.id,
      amount: this.amount,
      transactionId: this.transactionId,
      bookId: this.bookId,
    }
  }
}
