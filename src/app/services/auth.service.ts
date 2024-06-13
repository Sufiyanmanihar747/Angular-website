import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid?: string;

  constructor(private router: Router) {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        console.log(this.uid);
        console.log("user logged in with ", user.email)
      } else {
        this.uid = undefined;
        console.log("user is logged out")
      }
    });
  }

  isAuthenticated() {
    return this.uid ? true : false
  }

  getUid() {
    return this.uid;
  }

  registerUser(email: string, password: string) {

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        this.router.navigate(['/'])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        alert("Something went Wrong!!");
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        this.router.navigate(['/create'])

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        alert("Something went Wrong! Incorrect Email or Password");
      });
  }

  logoutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['/login'])
    }).catch((error) => {
      alert("Something went Wrong! Try Again")
    });
  }
}
