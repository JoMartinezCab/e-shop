import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  isLoading$;
  isLoading = false; 
  
  formGroup: FormGroup;

  constructor(
    private fb:FormBuilder,
    private usersService:UsersService,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.usersService.isLoading$;
    this.loadForm();
  }

  loadForm(){
    this.formGroup = this.fb.group({
      name: [null, Validators.compose([
        Validators.required, 
        Validators.minLength(3),
        Validators.maxLength(100)
      ])],
      email: [null, Validators.compose([
        Validators.required, 
        Validators.email,
        Validators.maxLength(249)
      ])],      
      password: [null, Validators.compose([
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(249)
      ])],
      rpassword: [null, Validators.compose([
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(249)
      ])],
      role: [1],      
    });
  }



}
