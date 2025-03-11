import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../model/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'backend/users';

  constructor(private httpClient: HttpClient ) { }

  // obtener lista
  public getUsers(page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.httpClient.get(this.usersUrl + 'list' + '?page=' + page + '&size=' + size + '&order=' + order + '&asc=' + asc);
  }

  // obtener uno a partir del id
  public getUser(id: number): Observable<any> {
    return this.httpClient.get(this.usersUrl + `${id}`);
  }

  // crear un usuario
  public createUser(dto: UserDto): Observable<any> {
    return this.httpClient.post(this.usersUrl + 'create', dto);
  }

  // actualizar un usuario
  public updateUser(id: number, dto: UserDto): Observable<any> {
    return this.httpClient.put(this.usersUrl + `update/${id}`, dto);
  }

  // eliminar un usuario a partir del id
  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.usersUrl + `delete${id}`);
  }
}
