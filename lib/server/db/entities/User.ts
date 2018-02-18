import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column() firstName: string

  @Column() lastName: string

  @Column({ unique: true })
  email: string

  @Column({ type: 'json', nullable: true })
  passwordHash: string
}
