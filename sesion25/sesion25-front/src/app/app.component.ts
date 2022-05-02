import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
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
export class AppComponent implements OnInit {

  constructor(private socketService: SocketService, public authService: AuthService) { }

  publicMessages: Message[] = [];
  publicMessage: string = '';
  privateMessages: Message[] = [];
  privateMessage: string = '';
  name: string = '';
  room: string = '';

  onSendPublic() {
    this.socketService.sendGeneralMessage(this.publicMessage);
    this.publicMessages.push({ message: this.publicMessage, from: 'me' })
    this.publicMessage = '';
  }

  onChangePublic(event: Event) {
    const target = event.target as HTMLInputElement;
    this.publicMessage = target.value;
  }

  onSendPrivate() {
    this.socketService.sendPrivateMessage(this.privateMessage);
    this.privateMessages.push({ message: this.privateMessage, from: 'me' })
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
    this.authService.setIsLoggedIn(true);
  }

  logout() {
    this.authService.setIsLoggedIn(false);
    this.name = '';
    this.room = '';
  }

  ngOnInit(): void {
    this.socketService.getGeneralMessage().subscribe({
      next: (message) => {
        this.publicMessages.push({ message, from: 'outside' });
      }
    })
    this.socketService.getPrivateMessage().subscribe({
      next: (message) => {
        this.privateMessages.push({ message, from: 'outside' });
      }
    })
  }
}
