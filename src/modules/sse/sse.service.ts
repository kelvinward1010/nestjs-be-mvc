import { Injectable } from '@nestjs/common';
import { interval, map, Observable, takeWhile } from 'rxjs';

@Injectable()
export class SseService {
    getEvents(): Observable<MessageEvent> {
        const message = 'Hello, this is a real-time message streamed character by character!';
        return interval(100).pipe(
            takeWhile(index => index < message.length),
            map(index => {
                const data = message.charAt(index);
                return new MessageEvent('message', { data });
            }),
        );
    }
}
