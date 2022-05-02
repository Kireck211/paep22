import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
interface Message {
  message: string;
  from: "outside" | "me"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  isLogged = false;

  constructor(private readonly socketService: SocketService) { }

  publicMessages: Message[] = [];
  publicMessage: string = '';
  privateMessages: Message[] = [];
  privateMessage: string = '';
  name: string = '';
  room: string = '';

  onSendPublic() {
    this.socketService.sendPublicMessage(this.publicMessage);
    this.publicMessages.push({ message: this.publicMessage, from: 'me' });
    this.publicMessage = '';
  }

  onChangePublic(event: Event) {
    const target = event.target as HTMLInputElement;
    this.publicMessage = target.value;
  }

  onSendPrivate() {
    this.socketService.sendPrivateMessage(this.privateMessage);
    this.privateMessages.push({ message: this.privateMessage, from: 'me' });
    this.privateMessage = '';
  }

  onChangePrivate(event: Event) {
    const target = event.target as HTMLInputElement;
    this.privateMessage = target.value;
  }

  onNameChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.name = target.value;
  }

  onRoomChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.room = target.value;
  }

  login() {
    this.socketService.login(this.name, this.room);
    this.isLogged = true;
  }

  logout() {
  }

  ngOnInit(): void {
    this.socketService.getPublicMessage().subscribe({
      next: (message) => {
        this.publicMessages.push({ message, from: 'outside' });
      }
    });
    this.socketService.getPrivateMessage().subscribe({
      next: (message) => {
        this.privateMessages.push({ message, from: 'outside' });
      }
    })
  }

  ngOnDestroy(): void {

  }
}
