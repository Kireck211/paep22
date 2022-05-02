import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  login(name: string, room: string) {
    this.socket.emit('login', ({ name, room }));
  }

  sendPrivateMessage(message: string) {
    this.socket.emit('sendPrivateMessage', message);
  }

  getPrivateMessage() {
    return new Observable<string>(observer => {
      this.socket.on('privateMessage', message => {
        observer.next(message);
      })
    })
  }

  sendGeneralMessage(message: string) {
    this.socket.emit('sendGeneralMessage', message);
  }

  getGeneralMessage() {
    return new Observable<string>(observer => {
      this.socket.on('generalMessage', message => {
        observer.next(message);
      })
    })
  }
}
