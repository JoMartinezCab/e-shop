import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

//environment varables
import { URL_SERVCIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user:any;
  token: string = '';

  constructor(
    private http:HttpClient,
    private router:Router
  ) {
    this.loadStorage();
  }

  login(email: string, password:string){
    let URL= `${URL_SERVCIOS}/auth/login`;

    return this.http.post(URL, {email, password}).pipe(
      map((auth:any) =>{
        return this.saveLocalStorageResponse(auth)
      }),
      catchError((err:any) => {
        return of(err);
      })
    );
  }

  register(data:any){
    let URL= `${URL_SERVCIOS}/auth/register`;

    return this.http.post(URL, data);
  }

  logout(){
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/']);
  }

  saveLocalStorageResponse(auth:any){
    if(auth.access_token && auth.user){
      localStorage.setItem('token', auth.access_token);
      localStorage.setItem('user', JSON.stringify(auth.user));

      this.token = auth.access_token;
      this.user = auth.user;

      return true;
    }
    return false;

  }

  loadStorage(){
    if(localStorage.getItem('token') && localStorage.getItem('user')){
      this.token = localStorage.getItem('token')!;
      this.user = JSON.parse(localStorage.getItem('user') ?? '');
    }
    else{
      this.token = '';
      this.user = null;
    }
  }

  validateState(){
    if(!this.user && !this.token){
      this.router.navigate(['auth/login']);
      return false;
    }

    let token = this.token;
    let expiracion = (JSON.parse(atob(token.split('.')[1]))).exp;

    if(Math.floor((new Date).getTime() / 1000) >= expiracion){
      this.logout();
      return false;
    }

    return true;
  }
}
