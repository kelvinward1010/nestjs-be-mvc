import { Module } from '@nestjs/common';
import { TasksScheduleService } from './task-schedule.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports:[
        ScheduleModule.forRoot(),
    ],
    providers: [TasksScheduleService],
})
export class TasksScheduleModule {}