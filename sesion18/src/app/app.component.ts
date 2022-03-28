import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'sesion18';
  counter = 0;
  isAlertEnabled = true;

  onChange(event: Event) {
    this.title = (<HTMLInputElement>event.target).value;
  }

  onClickedAlert() {
    this.counter++;
  }

  resetCounter() {
    this.counter = 0;
  }
}
