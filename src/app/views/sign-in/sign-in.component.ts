import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor() {}
  @Output() register = new EventEmitter();
  passwordVisibility: boolean = false;

  toggleVisilibity() {
    this.passwordVisibility = !this.passwordVisibility;
  }

  onSubmit(form: NgForm) {
    console.log(
      'Email: ' + form.value['email'] + ', password: ' + form.value['password']
    );
  }

  onClick() {
    this.register.emit();
  }
}
