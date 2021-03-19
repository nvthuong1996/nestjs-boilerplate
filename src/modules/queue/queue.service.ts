import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { InjectQueue } from '@nestjs/bull';
import { QueueName } from '../../common/constants/queue';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(QueueName.EXAMPLE_QUEUE) private exampleQueue: Queue,
  ) {}

  execTask() {
    return this.exampleQueue.add(
      {},
      {
        attempts: 5,
      },
    );
  }
}
