import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { AccountEntity } from '../../modules/user/entities/account.entity';
import { UtilsService } from '../../providers/utils.service';

@EventSubscriber()
export class UserSubscriber
  implements EntitySubscriberInterface<AccountEntity> {
  listenTo() {
    return AccountEntity;
  }
  beforeInsert(event: InsertEvent<AccountEntity>) {
    if (event.entity.password) {
      event.entity.password = UtilsService.generateHash(event.entity.password);
    }
  }
  beforeUpdate(event: UpdateEvent<AccountEntity>) {
    if (event.entity.password !== event.databaseEntity.password) {
      event.entity.password = UtilsService.generateHash(event.entity.password);
    }
  }
}
