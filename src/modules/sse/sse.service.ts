import { Injectable } from '@nestjs/common';
import { interval, map, Observable, Subject, switchMap, takeUntil, takeWhile } from 'rxjs';

@Injectable()
export class SseService {
    private messages = new Subject<string>();
    private connectionEstablished = new Subject<boolean>(); 
    private disconnect = new Subject<void>();

    sendMessage(message: string) {
        this.messages.next(message);
    }

    // getEvents(): Observable<MessageEvent> {
    //     const message = 'Hello, this is a real-time message streamed character by character!';
    //     return interval(100).pipe(
    //         takeWhile(index => index < message.length),
    //         map(index => {
    //             const data = message.charAt(index);
    //             return new MessageEvent('message', { data });
    //         }),
    //     );
    // }

    getEvents(): Observable<MessageEvent> {
        return this.connectionEstablished.asObservable().pipe(
            switchMap(() => this.messages.asObservable()),
            switchMap(message => {
                return interval(100).pipe(
                    takeWhile(index => index < message.length),
                    takeUntil(this.disconnect.asObservable()),
                    map(index => {
                        const data = message.charAt(index);
                        return new MessageEvent('message', { data });
                    })
                ); 
            }),
        );
    }

    disconnectStream() { 
        this.disconnect.next(); 
    }
}
