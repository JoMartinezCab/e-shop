import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user:any;
  public email:string = '';
  public password:string = '';

  constructor(private authService:AuthService, private router:Router){}

  login():void{
    if(!this.email || !this.password){
      console.log('Se necesita un emal y una contraseña');
      return;
    }

    this.authService.login(this.email, this.password)
      .subscribe((res:any) => {
        if(!res.error && res){
          this.email = '';
          this.password = '';

          this.router.navigate(['/']);
        }
        else if(res.error.error == 'Unauthorized'){
          console.log('El usuario o contraseña ingresado son inconectos');
          return;
        }
        }
      );
  }
}
