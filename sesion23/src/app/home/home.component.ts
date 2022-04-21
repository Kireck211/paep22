import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title, private readonly route: ActivatedRoute) {
    this.titleService.setTitle('Sesion 23 - Home');
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('params', params);
    })
  }

}
