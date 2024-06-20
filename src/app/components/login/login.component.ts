import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  constructor(private authServices: AuthService) { }

  // Reactive driven form 
  email = new FormControl("", [
    Validators.required,
    Validators.email
  ])

  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ])

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  })

  login() {
    // this.authServices.loginUser(this.loginForm.value.email!, this.loginForm.value.password!)
    if (this.loginForm.invalid) {
      this.toast.showToast("Please enter valid email and password!", "bg-red-500");
    } else {
      this.authServices.loginUser(this.loginForm.value.email!, this.loginForm.value.password!).then((success) => {
        if (success) {
          this.toast.showToast("Welcome Back!");
        } else {
          this.toast.showToast("Email or Password Wrong!", "bg-red-500");
        }
      })
        .catch(() => {
          this.toast.showToast("An unexpected error occurred. Please try again!", "bg-red-500");
        });
    }
  }

  reset() {
    this.loginForm.reset()
  }
}
