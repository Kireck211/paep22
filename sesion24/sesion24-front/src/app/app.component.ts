import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Location, LocationsService } from './locations.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  locationObtained: undefined | string;
  locationCUD: undefined | string;
  locationToSearch: string = '';
  form: FormGroup;
  image: File | undefined;
  imageSource: undefined | string;

  constructor(readonly locationsService: LocationsService, readonly usersService: UsersService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      longitude: new FormControl(),
      latitude: new FormControl()
    });
    this.handleLocation = this.handleLocation.bind(this);
  }

  onGetLocation() {
    this.locationsService.getLocation(this.locationToSearch)
      .subscribe({
        next: (location) => {
          this.locationObtained = JSON.stringify(location, null, 4);
        }
      })
  }

  onChangeLocationToSearch(event: Event) {
    const value = (<HTMLInputElement>event.target).value;
    this.locationToSearch = value;
  }

  createLocation() {
    const { name, latitude, longitude } = this.form.value;
    this.locationsService.createLocation({
      name,
      latitude,
      longitude
    })
      .subscribe(this.handleLocation)
  }

  updateLocation() {
    const { name, latitude, longitude } = this.form.value;
    this.locationsService.updateLocation({
      name,
      latitude,
      longitude
    })
      .subscribe(this.handleLocation)
  }

  deleteLocation() {
    const { name } = this.form.value;
    this.locationsService.deleteLocation(name)
      .subscribe(this.handleLocation)
  }

  handleLocation(location: {} | Location) {
    this.locationCUD = JSON.stringify(location, null, 4);
  }

  clearForm() {
    this.form.reset();
    this.locationCUD = '';
  }

  selectFile(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      this.image = target.files[0];
    }
  }

  uploadImage() {
    const formData = new FormData();
    if (this.image === undefined) return;

    formData.append('profilePicture', this.image as Blob, this.image.name)
    this.usersService.uploadImage(formData)
      .subscribe((response: any) => {
        this.imageSource = response.url;
      })
  }
}
