import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private unsubscribe: Subscription[] = []; 
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  user: any;
  token: string;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    
    this.loadstorage();
  }

  loadstorage(){
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user"));
    }else{
      this.user=null;
      this.token = '';
    }
  }
  
  isLogued() {
    return ( this.token.length > 5 ) ? true : false;
  }
  
  login(email: string, password: string) {
    let url = `${URL_SERVICIOS}/auth/login`;
    let platform = 2;
    this.isLoadingSubject.next(true);

    return this.http.post(url,{email, password, platform}).pipe(
      map((auth: any) => {
        console.log(auth)
        return (auth.access_token)? this.setAuthFromLocalStorage(auth): auth;
      }),
      
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
  private setAuthFromLocalStorage(auth: any): boolean {
    if (auth.access_token && auth.user) {
      localStorage.setItem('token', auth.access_token );
      localStorage.setItem('user', JSON.stringify(auth.user));

      this.user = auth.access_token;
      this.token = auth.user;

      return true;
    }

    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
