import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  formType: 'signin' | 'register' = 'signin';

  switchFormType() {
    if (this.formType === 'signin') {
      this.formType = 'register';
    } else {
      this.formType = "signin";
    }
  }

}
