import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  loadChildren: () => import('./modules/home/home.module')
    .then( m => m.HomeModule)
},{
  path: 'auth',
  loadChildren: () => import('./modules/auth-profile/auth-profile.module')
    .then( m => m.AuthProfileModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }