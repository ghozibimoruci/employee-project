import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { LoginComponent } from './pages/login/login.component';
import { GuardService } from './service/guard-service';

const isLogin = () => {
  let tokenString = localStorage.getItem('tokenString');
  return tokenString?true:false;
}
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: '',
    component: BasePageComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate:[GuardService]},
      { path: 'about', component: AboutComponent, canActivate:[GuardService]},
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }