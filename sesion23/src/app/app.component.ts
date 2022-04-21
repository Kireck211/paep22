import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'sesion23';
  isAdmin = false;

  constructor(private readonly router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    setInterval(() => {
      // this.router.navigate(['/home']);
    }, 5000);
  }

}
