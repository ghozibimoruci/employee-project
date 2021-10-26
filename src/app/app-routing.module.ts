import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { LoginComponent } from './pages/login/login.component';

const isLogin = () => {
  let tokenString = localStorage.getItem('tokenString');
  return tokenString?true:false;
}
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }