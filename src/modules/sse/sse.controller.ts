import { Controller, Get, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
    constructor(private readonly sseService: SseService) { }

    @Get('events')
    @Sse()
    sendEvents(): Observable<MessageEvent> {
        return this.sseService.getEvents();
    }
}
