import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-warning-alert',
  templateUrl: './warning-alert.component.html',
  styleUrls: ['./warning-alert.component.less']
})
export class WarningAlertComponent implements OnInit {

  @Input() content: string = 'Hello World!';
  @Input() type: string = 'warning';
  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.clicked.emit()
  }

}
