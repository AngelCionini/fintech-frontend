import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  onSubmit(form: NgForm) {
    console.log('Email: ' + form.value['email'] + ', password: ' + form.value['password']);
  }

}
