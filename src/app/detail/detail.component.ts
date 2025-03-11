import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BigUser } from '../model/big-user';
/*
hay que instalar sweetalert2. Para ello en la consola de comandos tecleamos: 
npm i sweetalert2
( si lo has clonado de git y has hecho un 'npm install' debería estar ya )
*/
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detail',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  user: BigUser;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // al inicio cargamos el usuario
  ngOnInit(): void {
    let id = +this.activatedRoute.snapshot.params['id'];
    this.loadUser(id);
  }


  // método para cargar al usuario
  loadUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: ((data: BigUser) => {
        this.user = data;
        console.log(this.user);
      }), error: ((error: any) => {
        console.error(error);
      })
    });
  }

  // borrar: usamos un cuadro de diálogo donde aceptar o cancelar
  onDelete(): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No hay vuelta atrás!",
      icon: "warning",
      iconColor: "#ffc107",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Dale",
      cancelButtonText: 'Mejor no'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(this.user.id).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Usuario eliminado!",
              text: this.user.first_name + " ya no existe",
              icon: "success"
            });
            this.router.navigate(['/']);
          },
          error: (error) => {
            Swal.fire({
              title: "Error",
              text: "No se pudo eliminar el usuario",
              icon: "error",
              iconColor: "#ffc107"
            });
          }
        });
      }
    });
  }


}
