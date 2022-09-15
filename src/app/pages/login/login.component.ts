import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('userNameField', null) userNameField: ElementRef;
  @ViewChild('passWordField', null) passWordField: ElementRef;
  focusField(fieldName: ElementRef){
    fieldName.nativeElement.focus();
  }
  userName='';
  passWord='';
  seePassWord=false;
  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userName='ghozibimoruci';
    this.passWord='ghozibimoruci';
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
        sessionStorage.setItem('tokenLogin', JSON.stringify({
          username: this.userName,
          password: this.passWord
        }));
        this.router.navigateByUrl('/employee');
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
