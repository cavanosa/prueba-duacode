import { Component, OnInit } from '@angular/core';
import { UserDto } from '../model/user-dto';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BigUser } from '../model/big-user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

   user: BigUser | undefined;
  
    firstNameError = '';
    lastNameError = '';
    emailError = '';
    avatarError = '';
    urlError = '';
    textError = '';
  
    firstName = '';
    lastName = '';
    email = '';
    avatar = 'https://i.pravatar.cc/42';
    url = 'https://www.google.es/';
    text = '';
  
    updated = false;
    messageUpdated = '';
    errorUpdated = '';
    failUpdated = false
  
    constructor(
      private userService: UserService,
      private activatedRoute: ActivatedRoute,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      let id = this.activatedRoute.snapshot.params['id'];
      this.userService.getUser(id).subscribe({
        next: ((data: BigUser) => {
          this.user = data;
        }), error: ((error: any) => {
          this.router.navigate(['/']);
          
        })
      });
    }
  
    onUpdate(): void {
      if(!this.user || !this.checkFirstName() || !this.checkLastName() || !this.checkEmail() || !this.checkAvatar() || !this.checkUrl() || !this.checkText()) {
        return;
      }
      let dto: any = {};
      dto.firstName = this.user.first_name;
      dto.lastName = this.user.last_name;
      dto.email = this.user.email;
      dto.avatar = this.user.avatar;
      dto.url = this.user.support.url;
      dto.text = this.user.support.text;
      this.reset();
      this.userService.updateUser(this.user.id, dto).subscribe({
        next: ((data: any) => {
          this.updated = true;
          this.messageUpdated = data.message;
        }), error: ((error: any) => {
          this.failUpdated = true;
          this.errorUpdated= error.error.message;
        })
      });
    }
    
  
    checkFirstName(): boolean {
      if (this.user?.first_name.trim() === '') {
        this.firstNameError = 'El nombre es obligatorio';
        return false;
      } else {
        this.firstNameError = '';
        return true;
      }
    }
  
    checkLastName(): boolean {
      if (this.user?.last_name.trim() === '') {
        this.lastNameError = 'El apellido es obligatorio';
        return false;
      } else {
        this.lastNameError = '';
        return true;
      }
    }
  
    checkEmail(): boolean {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!emailRegex.test(this.user.email)) {
        this.emailError = 'Dirección de correo no válida';
        return false;
      } else {
        this.emailError = '';
        return true;
      }
    }
    
    checkAvatar(): boolean {
      if (this.user.avatar.trim() === '') {
        this.avatarError = 'La url del avatar es obligatoria';
        return false;
      }else if(!this.checkUrlOk(this.user.avatar)){
        this.avatarError = 'url no válida';
        return false;
      } else {
        this.avatarError = '';
        return true;
      }
    }
  
    checkUrl(): boolean {
      if (this.user.support.url.trim() === '') {
        this.urlError = 'La url es obligatoria';
        return false;
      }else if(!this.checkUrlOk(this.user.support.url)){
        this.urlError = 'url no válida';
        return false;
      } 
      else {
        this.urlError = '';
        return true;
      }
    }
  
    checkText(): boolean {
      if (this.user.support.text.trim() === '') {
        this.textError = 'El texto es obligatorio';
        return false;
      } else {
        this.textError = '';
        return true;
      }
    }
  
    endUrlOK(url: string): boolean {
      const regex = /\/([1-9][0-9]{0,2}|1000)$/;
      return regex.test(url);
    }
  
    checkUrlOk(url: string): boolean {
      const urlRegex = /^(https?|http):\/\/[^\s/$.?#].[^\s]*$/i;
      return urlRegex.test(url);
    }

    reset(): void {
      this.updated = false;
      this.messageUpdated = '';
      this.errorUpdated = '';
      this.failUpdated = false;
    }

}
