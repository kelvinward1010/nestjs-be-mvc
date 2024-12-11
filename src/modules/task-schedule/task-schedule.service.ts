import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksScheduleService {
    @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron() {
        console.log('Task running every 10 seconds');
    }
}
