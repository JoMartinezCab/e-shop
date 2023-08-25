import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth-profile/_services/auth.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  user:any = null;
  constructor(private authService:AuthService){

  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logOut(){
    this.authService.logout();
  }
}
