import { Component } from '@angular/core';

import { AlertType } from './shared/types';

type AlertCounter = {
  [key in AlertType]: number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  alertCounter: AlertCounter = {
    'primary': 0,
    'secondary': 0,
    'success': 0,
    'danger': 0,
    'warning': 0,
    'info': 0,
    'light': 0,
    'dark': 0
  }

  onAlertClicked(type: AlertType) {
    console.log('clicked', type);
    this.alertCounter[type]++;
  }
}
