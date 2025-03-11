import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserDto } from '../model/user-dto';

@Component({
  selector: 'app-create',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  userDto: UserDto | undefined;

  // campos de error si están mal los campos del formulario
  firstNameError = '';
  lastNameError = '';
  emailError = '';
  avatarError = '';
  urlError = '';
  textError = '';

  // valores de los campos
  firstName = '';
  lastName = '';
  email = '';
  avatar = 'https://i.pravatar.cc/42';
  url = 'https://www.google.es/';
  text = 'Tired of writing endless social media content? Let Content Caddy generate it for you.';

  // variables para controlar el éxito al crera y el error
  created = false;
  failCreated = false;
  messageCreated = '';
  errorCreated = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  // método para crear un usuario nuevo
  onCreate(): void {
    if (!this.checkFirstName() || !this.checkLastName() || !this.checkEmail() || !this.checkAvatar() || !this.checkUrl() || !this.checkText()) {
      return;
    }
    this.userDto = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      avatar: this.avatar,
      url: this.url,
      text: this.text
    };
    this.userService.createUser(this.userDto).subscribe({
      next: ((data: any) => {
        console.log(data);
        this.created = true;
        this.messageCreated = data.message;
      }), error: ((error: any) => {
        console.error(error.error.message);
        this.failCreated = true;
        this.errorCreated = error.error.message;
      })
    });
  }


  checkFirstName(): boolean {
    if (this.firstName.trim() === '') {
      this.firstNameError = 'El nombre es obligatorio';
      return false;
    } else {
      this.firstNameError = '';
      return true;
    }
  }

  checkLastName(): boolean {
    if (this.lastName.trim() === '') {
      this.lastNameError = 'El apellido es obligatorio';
      return false;
    } else {
      this.lastNameError = '';
      return true;
    }
  }

  checkEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Dirección de correo no válida';
      return false;
    } else {
      this.emailError = '';
      return true;
    }
  }

  // métodos de comprobación de los campos
  checkAvatar(): boolean {

    if (this.avatar.trim() === '') {
      this.avatarError = 'La url del avatar es obligatoria';
      return false;
    } else if (!this.avatar.startsWith('https://i.pravatar.cc/')) {
      this.avatarError = 'La url del avatar no es correcta';
      return false;
    } else if (!this.endUrlOK(this.avatar)) {
      this.avatarError = 'El número no es correcto';
      return false;

    } else {
      this.avatarError = '';
      return true;
    }
  }

  checkUrl(): boolean {
    if (this.url.trim() === '') {
      this.urlError = 'La url es obligatoria';
      return false;
    } else if (!this.checkUrlOk(this.url)) {
      this.urlError = 'url no válida';
      return false;
    }

    else {
      this.urlError = '';
      return true;
    }
  }

  checkText(): boolean {
    if (this.text.trim() === '') {
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

  // fin métodos de comprobación

  //método para vaciar el formulario

  reset(): void {
    this.avatar = 'https://i.pravatar.cc/42';
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.url = 'https://www.google.es/';
    this.text = 'Tired of writing endless social media content? Let Content Caddy generate it for you.';
    this.firstNameError = '';
    this.lastNameError = '';
    this.emailError = '';
    this.avatarError = '';
    this.urlError = '';
    this.textError = '';
    this.created = false;
    this.failCreated = false;
    this.messageCreated = '';
    this.errorCreated = '';
  }

}
