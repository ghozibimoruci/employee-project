import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: "./pages/login/login.module#LoginModule"
  },
  {
    path: 'employee',
    loadChildren: "./pages/employee-salt/employee.module#EmployeeModule"
  },
  {
    path: 'tic-tac-toe',
    loadChildren: "./pages/tic-tac-toe/tic-tac-toe.module#TicTacToeModule"
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
