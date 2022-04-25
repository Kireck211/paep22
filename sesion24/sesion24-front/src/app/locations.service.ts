import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Location {
  longitude: number;
  latitude: number;
  name: string;
}

export interface UpdateLocation {
  longitude?: number;
  latitude?: number;
  name: string;
}

@Injectable({
  providedIn: `root`
})
export class LocationsService {
  URL = `https://backend-paep22.herokuapp.com/`

  constructor(private http: HttpClient) { }

  getLocations() {
    this.http.get<Location[]>(`${this.URL}locations`);
  }

  getLocation(name: string) {
    return this.http.get<Location | {}>(`${this.URL}locations/` + name);
  }

  createLocation(location: Location) {
    return this.http.post<Location>(`${this.URL}locations`, location);
  }

  updateLocation(location: UpdateLocation) {
    return this.http.put<Location>(`${this.URL}locations/` + location.name, location);
  }

  deleteLocation(name: string) {
    return this.http.delete<Location | {}>(`${this.URL}locations/` + name);
  }

}
