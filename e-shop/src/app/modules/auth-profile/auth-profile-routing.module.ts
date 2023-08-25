import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Component
import { AuthProfileComponent } from './auth-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './_services/auth.guard';

const routes: Routes = [{
  path: '',
  component: AuthProfileComponent,
  children:[{
    path: 'login',
    canActivate: [authGuard],
    component: LoginComponent
  },{
    path: 'register',
    canActivate: [authGuard],
    component: RegisterComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthProfileRoutingModule { }
