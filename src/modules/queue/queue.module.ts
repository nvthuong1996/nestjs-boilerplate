import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueName } from '../../common/constants/queue';
import { QueueUIProvider } from './queue-ui';
import { ExampleProcessor } from './processor/example.processor';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.EXAMPLE_QUEUE,
    }),
  ],
  controllers: [],
  providers: [QueueUIProvider, ExampleProcessor, QueueService],
  exports: [QueueService],
})
export class QueueModule {}
