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
import { SidenavComponent } from './core/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { CardsComponent } from './views/cards/cards.component';
import {MatTableModule} from '@angular/material/table';
import { NewCardComponent } from "./views/cards/new-card/new-card.component";
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      RegisterComponent,
      SignInComponent,
      SidenavComponent,
      HomeComponent,
      CardsComponent,
      NewCardComponent

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
      ValidateEqualModule,
      MatSidenavModule,
      MatListModule,
      MatTableModule,
      MatSelectModule
    ],
    providers: [
      provideAnimationsAsync()
    ],
  })
  export class AppModule {}
  