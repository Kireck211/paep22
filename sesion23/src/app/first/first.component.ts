import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.less']
})
export class FirstComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Sesion 23 - First Component');
  }

  ngOnInit(): void {
  }

}
