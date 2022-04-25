import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  URL = `https://backend-paep22.herokuapp.com/`

  constructor(private http: HttpClient) { }

  uploadImage(image: FormData) {
    return this.http.post(`${this.URL}users/profilePictureLocal`, image);
  }
}
