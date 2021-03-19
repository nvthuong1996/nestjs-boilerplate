import { Process, Processor } from '@nestjs/bull';
import { QueueName } from '../../../common/constants/queue';
import { Injectable, Logger } from '@nestjs/common';
import { DoneCallback, Job } from 'bull';

@Processor(QueueName.EXAMPLE_QUEUE)
@Injectable()
// calculate user course progress
export class ExampleProcessor {
  private readonly logger = new Logger(ExampleProcessor.name);
  private transporters = new Map();

  @Process()
  async progress(job: Job, cb: DoneCallback) {
    return true;
  }
}
