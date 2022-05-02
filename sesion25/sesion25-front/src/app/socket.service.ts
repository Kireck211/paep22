import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendPublicMessage(message: string) {
    this.socket.emit('publicMessage', message);
  }

  getPublicMessage() {
    return new Observable<string>(observer => {
      this.socket.on('publicMessage', (message: string) => {
        observer.next(message);
      });
    });
  }

  login(name: string, room: string) {
    this.socket.emit('login', ({ name, room }));
  }

  sendPrivateMessage(message: string) {
    this.socket.emit('privateMessage', message);
  }

  getPrivateMessage() {
    return new Observable<string>(observer => {
      this.socket.on('privateMessage', (message: string) => {
        observer.next(message);
      });
    });
  }
}
