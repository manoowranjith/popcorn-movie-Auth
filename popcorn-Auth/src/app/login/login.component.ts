import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailERR=""
  passwordERR=""
  userRole:any
  submitForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  constructor(private http:HttpClient,private router:Router)
  {

  }
  ngOnInit(): void {
  }

  Authentication(operation : string)
  {
    this.emailERR=""
    this.passwordERR=""
    var format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.submitForm.value.email || !this.submitForm.value.email.match(format)) 
    {
      this.emailERR="Invalid email"
    } 

    if(!this.submitForm.value.password || this.submitForm.value.password.length < 5)
    {
      this.passwordERR="password length must be atleast 5"
    }

    var URL = ""
    if(operation === "Login")
    {
      URL = "http://localhost:3000/login"
    }
    else{
      URL = "http://localhost:3000/signup"
    }
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
    this.http.post <any> (URL, JSON.stringify({email: this.submitForm.value.email, password:this.submitForm.value.password}), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data)
      localStorage.setItem("key",data.key)
    });
  }
}
