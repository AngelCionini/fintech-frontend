import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./views/login/login.component";
import { HomeComponent } from "./views/home/home.component";
import { CardsComponent } from "./views/cards/cards.component";
import { MovementsComponent } from "./views/cards/movements/movements.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cards',
    component: CardsComponent
  },
  {
    path: 'movement',
    component: MovementsComponent
  },
  {
    path: 'movement/:cardId',
    component: MovementsComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }