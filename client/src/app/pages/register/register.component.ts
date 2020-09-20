import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  studentForm: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: [''],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.user = {
      id: null,
      name: '',
      email: '',
      username:'',
      password: ''
    }
  }

  onSubmit(): void {
    this.userService.createUser(this.studentForm.value).subscribe(
      () => this.router.navigate(['login']),
      (err: any) => console.log(err)
    )
    console.log(this.studentForm.value)
  }

}
