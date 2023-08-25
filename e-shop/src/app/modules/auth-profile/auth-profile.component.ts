import { Component, OnInit } from '@angular/core';

declare let $:any;
declare function initEShop([]):any;

@Component({
  selector: 'app-auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.css']
})

export class AuthProfileComponent implements OnInit {
  ngOnInit() :void{
    setTimeout(() => {
      initEShop($)
    }, 50);
  }
}
