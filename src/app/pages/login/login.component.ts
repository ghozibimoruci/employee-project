import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GuardService } from 'src/app/service/guard-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('userNameField') userNameField: ElementRef;
  @ViewChild('passWordField') passWordField: ElementRef;
  focusField(fieldName: ElementRef){
    fieldName.nativeElement.focus();
  }
  userName='';
  passWord='';
  seePassWord=false;
  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    if(GuardService){
      this.router.navigateByUrl('home');
    }
  }

  loginUser(){
    if(!this.userName){
      this.openSnackBar('Your Username is empty!');
      this.focusField(this.userNameField);
    }else if(!this.passWord){
      this.openSnackBar('Your Password is empty!');
      this.focusField(this.passWordField);
    }else{
      if(this.userName == 'ghozibimoruci' && this.passWord == 'ghozibimoruci'){
        localStorage.setItem('tokenLogin', JSON.stringify({
          username: this.userName,
          password: this.passWord
        }));
        setTimeout(()=>{this.router.navigateByUrl('/home');}, 200);
      }else{
        this.openSnackBar('Your Username or Password are invalid!');
      }
    }
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Dismiss', {
      horizontalPosition: 'end',
      panelClass: 'snackbar-epsilon'
    })
  }
}
