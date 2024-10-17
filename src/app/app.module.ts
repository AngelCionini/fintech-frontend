import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ValidateEqualModule } from "ng-validate-equal";

@NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      SignInComponent
    ],
    bootstrap: [AppComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      FormsModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      ValidateEqualModule
    ],
    providers: [
      provideAnimationsAsync()
    ],
  })
  export class AppModule {}
  