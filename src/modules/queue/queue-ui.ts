import { setQueues, BullAdapter } from 'bull-board';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { QueueName } from '../../common/constants/queue';
import { Queue } from 'bull';
@Injectable()
export class QueueUIProvider {
  constructor(
    @InjectQueue(QueueName.EXAMPLE_QUEUE) private readonly queueOne: Queue,
  ) {
    setQueues([new BullAdapter(queueOne)]);
  }
}
