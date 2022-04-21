import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAdmin = false;

  constructor() { }

  isLoggedIn(): boolean {
    return Math.random() > 0.5;
  }
}
