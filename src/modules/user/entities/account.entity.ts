import { Column, Entity, Index, JoinColumn, OneToOne, Unique } from 'typeorm';
import { UserEntity } from './user.entity';
import { AbstractEntity } from '../../../common/abstract.entity';

@Entity()
@Unique('unique_email', ['email'])
export class AccountEntity extends AbstractEntity {
  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'password', nullable: true })
  password: string;

  @Index()
  @Column('uuid', { name: 'user_id' })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.account, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;

  @Column({ nullable: true })
  resetKey: string;

  @Column({ nullable: true })
  resetDate: Date;
}
