import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.less']
})
export class QuoteComponent implements OnInit {
  @Input() content: string = '';
  @Input() author: string = '';
  @Output() refresh = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.refresh.emit('');
  }

}
