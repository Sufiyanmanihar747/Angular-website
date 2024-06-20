import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ToastComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  @ViewChild(ToastComponent) toast!: ToastComponent;
  constructor(private authServices: AuthService, private router: Router) { }

  // Template driven form 
  register(regForm: NgForm) {
    // this.authServices.registerUser(regForm.value.email, regForm.value.password)
    if (regForm.invalid) {
      this.toast.showToast("Please enter valid email and password!", "bg-red-500");
    }
    else {
      this.authServices.registerUser(regForm.value.email!, regForm.value.password!).then((success) => {
        if (success) {
          this.toast.showToast("You are Sign in!");
          this.router.navigate(['/'])
        }
      })
        .catch(() => {
          this.toast.showToast("An unexpected error occurred. Please try again!", "bg-red-500");
        });
    }

  }
}
