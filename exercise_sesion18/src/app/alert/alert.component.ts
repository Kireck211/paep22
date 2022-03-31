import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlertType } from '../shared/types';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.less']
})
export class AlertComponent {

  @Input() type: AlertType | string = 'primary';
  @Input() content: String = '';
  @Output() clicked = new EventEmitter<AlertType>();

  constructor() {

  }

  onAlertClicked() {
    this.clicked.emit(this.type as AlertType);
  }
}
