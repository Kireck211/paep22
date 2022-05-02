import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  constructor() { }

  setIsLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
