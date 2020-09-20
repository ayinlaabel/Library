import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService) {}

  myLogin: FormGroup;
  
  ngOnInit() {

    this.myLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    console.log(this.myLogin.value);

  }

  ngOnDestroy() {
  }

   //convenience getter for easy access to form fields
   get f() { return this.myLogin.controls; }

  onLogin() {
    let username = this.f.username.value
    this.userService.loginUser(username, this.f.password.value).subscribe(
      () => this.router.navigate(['dashboard']),
      (err: any) => {
        console.log(err)
        this.router.navigate(['login'])
      }
    )
    console.log(username);
  }

}
