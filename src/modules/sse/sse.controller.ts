import { Controller, Get, HttpCode, Post, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SseService } from './sse.service';
import { Message as MessageDecorator } from 'src/common/decorators/message.decorator';

@Controller('sse')
export class SseController {
    constructor(private readonly sseService: SseService) { }

    // @Get('events')
    // @Sse()
    // sendEvents(): Observable<MessageEvent> {
    //     return this.sseService.getEvents();
    // }

    @Post('events')
    @HttpCode(200)
    createAndSendMessage(@MessageDecorator('message') message: string): void {
        return this.sseService.sendMessage(message);
    }

    @Sse('stream') 
    sendEvents(): Observable<MessageEvent> { 
        console.log('Starting SSE stream'); 
        //this.sseService.establishConnection();
        return this.sseService.getEvents(); 
    }
}
