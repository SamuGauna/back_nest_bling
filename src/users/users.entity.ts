import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName?: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @Column({ type: 'boolean' })
  isCompany?: boolean;

  @Column({ type: 'boolean' })
  isClient?: boolean;

  @Column({ type: 'boolean', default: false })
  isBlocked?: boolean;

  @Column({ type: 'varchar', length: 10 })
  gender?: string;

  @Column({ type: 'date' })
  birth?: Date;

  @Column({ type: 'varchar', length: 100 })
  country?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  residenceCountry?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  legalIdentification?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImage?: string;

  @Column({ type: 'varchar', length: 255 })
  tokenEmailVerification?: string;

  @Column({ type: 'date' })
  tokenEmailVerificationCreatedAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date | null;
}
