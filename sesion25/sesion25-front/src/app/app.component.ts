import { Component } from '@angular/core';
interface Message {
  message: string;
  from: "outside" | "me"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor() { }

  publicMessages: Message[] = [];
  publicMessage: string = '';
  privateMessages: Message[] = [];
  privateMessage: string = '';
  name: string = '';
  room: string = '';

  onSendPublic() {
  }

  onChangePublic(event: Event) {
    const target = event.target as HTMLInputElement;
    this.publicMessage = target.value;
  }

  onSendPrivate() {
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
  }

  logout() {
  }
}
