import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  registrationForm;
  user : any = {};
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegistrationForm();    
  }

  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      username: [null, Validators.required],
      email: [null, Validators.required]
    });
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    this.user = Object.assign(this.user, this.registrationForm.value);
    localStorage.setItem('Users', JSON.stringify(this.user));
  }
}
