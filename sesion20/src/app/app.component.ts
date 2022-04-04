import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'sesion20';
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      lastName: new FormControl(),
      email: new FormControl(),
      username: new FormControl('', this.validateUsername()),
      born: new FormControl()
    })
  }

  validateUsername(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (value.length < 3) {
        return { min: true }
      }
      if (value.length > 30) {
        return { max: true }
      }
      return null;
    };
  }

  onSubmit(value: any) {
    console.log(value);
  }
}
