import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'sesion19';
  students = [
    {
      name: 'Oscar'
    },
    {
      name: 'Vania'
    },
    {
      name: 'Dario'
    },
    {
      name: 'Gras'
    },
    {
      name: 'Narda'
    }
  ]
  type: string = 'primary';

  onChange(event: Event) {
    this.type = (<HTMLInputElement>event.target).value;
  }
}
