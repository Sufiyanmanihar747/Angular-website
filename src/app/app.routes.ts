import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CodeBinComponent } from './components/code-bin/code-bin.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { MysnippetComponent } from './components/mysnippet/mysnippet.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'create', component: CodeBinComponent, canActivate: [authGuard] },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(mod => mod.AboutComponent) },
  // { path: 'snippet', component: ShowComponent },
  { path: 'mysnippet', component: MysnippetComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent }
]; 
