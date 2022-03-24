import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.less']
})
export class SuccessAlertComponent implements OnInit {
  name = 'Erick';

  constructor() { }

  ngOnInit(): void {
  }

  onChangeInput(event: Event) {
    const text = (<HTMLInputElement>event.target).value;
    this.name = text;
  }

  clickedParagraph(event: Event) {
    console.log('clicked on p');
    console.log(event);
  }

}
