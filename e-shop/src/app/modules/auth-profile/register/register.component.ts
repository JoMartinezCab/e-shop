import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public name:string = '';
  public email:string = '';
  public password:string = '';
  public confirmPassword:string = '';
  public terms:boolean = false;

  constructor(
    private router:Router,
    private authService:AuthService){}

  ngOnInit(): void {
    if(this.authService.user && this.authService.token){
      this.router.navigate(['/']);
    }
  }

  register(){
    let data = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    if(!this.name || !this.email || !this.password || !this.confirmPassword){
      console.log('Necesita llenar todos los campos');
      return;
    }

    if(this.password != this.confirmPassword){
      console.log('Las contraseñas deben coincidir');
      return;
    }

    this.authService.register(data).subscribe((res:any) =>{
      console.log(res);
      this.router.navigate(['auth/login']);
    });
  }
}
