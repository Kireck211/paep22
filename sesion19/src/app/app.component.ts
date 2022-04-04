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
  date: Date = new Date(1649767577769);

  onChange(event: Event) {
    this.date = new Date((<HTMLInputElement>event.target).value);
  }
}
