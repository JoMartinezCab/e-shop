import { Component, OnInit } from '@angular/core';

declare let $:any;
declare function initEShop([]):any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit() :void{
    initEShop($)
    /*setTimeout(() => {
    }, 50);*/
  }
}
