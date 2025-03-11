import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmallUser } from '../model/small-user';

@Component({
  selector: 'app-list',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  users: SmallUser[] = [];

  // paginación
  page = 0;
  size = 2;
  total_pages: Array<number> = [];
  total = 0;
  isFirst = false;
  isLast = false;

  // orden (campo y ascendente o descendente)
  asc = true;
  order = 'id';

  // ver más
  more = true;

  // tipo de vista (lista o tarjetas)
  isCardView = false

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // se cargan los usuarios
  loadUsers(): void {
    this.userService.getUsers(this.page, this.size, this.order, this.asc).subscribe({
      next: ((data: any) => {
        console.log(data);
        this.total = data.totalElements;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.total_pages = new Array(data['totalPages']);
        this.users = data.content;
      }), error: ((error: any) => {
        console.error(error);
      })
    });
  }

  // método para ver más
  viewMore(): void {
    this.more = false;
    this.size = 4;
    this.loadUsers();
  }

  // se determina el orden de la lista (por defecto id)
  setOrder(order: string): void {
    this.order = order;
    this.loadUsers();
  }

  // cambiamos entre orden ascendente y orden descendente
  sort(): void {
    this.asc = !this.asc;
    this.loadUsers();
  }

  // retrocedemos una página
  rewind(): void {
    if (!this.isFirst) {
      this.page--;
      this.loadUsers();
    }

  }

  // avanzamos una página
  forward(): void {
    if (!this.isLast) {
      this.page++;
      this.loadUsers();
    }
  }

  // se va a una página determinada (método para los números de paginación)
  setPage(page: number): void {
    this.page = page;
    this.loadUsers();

  }

  // vamos a la primera página
  goInit(): void {
    this.page = 0;
    this.loadUsers();
  }

  // vamos a la última página
  goEnd(): void {
    const lastPage = Math.ceil(this.total / this.size) - 1;
    this.page = lastPage;
    this.loadUsers();
  }



}
