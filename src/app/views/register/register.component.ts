import { Component, EventEmitter, Output, signal } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() signIn = new EventEmitter();
  passwordVisibility: boolean = false;
  passwordRepeatVisibility: boolean = false;

  toggleVisilibity(type: string) {
    if (type === 'password') {
      this.passwordVisibility = !this.passwordVisibility;
    } else {
      this.passwordRepeatVisibility = !this.passwordRepeatVisibility;
    }
  }

  onClick() {
    this.signIn.emit();
  }

  onSubmit(form: NgForm) {
    console.log(
      'Email: ' +
        form.value['email'] +
        ', Nome: ' +
        form.value['nome'] +
        ', Cognome: ' +
        form.value['cognome'] +
        ', Password: ' +
        form.value['password']
    );
  }
}
