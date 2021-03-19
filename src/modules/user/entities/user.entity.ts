import { Column, Entity, Index, OneToOne } from 'typeorm';

import { AccountEntity } from './account.entity';
import { RoleType } from '../../../common/constants/role-type';
import { AbstractEntity } from '../../../common/abstract.entity';

@Entity()
export class UserEntity extends AbstractEntity {
  @Column({ nullable: true, length: 255 })
  avatar: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({
    type: 'simple-array',
    default: RoleType.USER,
    enum: Object.values(RoleType),
  })
  roles: RoleType[];

  @OneToOne(() => AccountEntity, (account) => account.user, {
    cascade: ['insert', 'update'],
  })
  account: AccountEntity;

  @Column({ nullable: true })
  lastAccessedAt: Date;
}
