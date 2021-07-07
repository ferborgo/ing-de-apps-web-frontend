import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { IUser } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('admin');
  }

  saveToken(token: string, admin: string): void {
    localStorage.setItem('token', token);
    const decoded: any = jwt_decode(token);

    const email = decoded.email;
    const username = decoded.name;
    const id = decoded.id;

    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('id', id);

    if (admin && admin !== 'undefined') {
      localStorage.setItem('admin', String(admin));
    } else {
      localStorage.setItem('admin', 'false');
    }
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUser(): IUser {
    const admin: boolean = localStorage.getItem('admin') == 'true';
    const user: IUser = {
      email: localStorage.getItem('email'),
      username: localStorage.getItem('username'),
      id: localStorage.getItem('id'),
      admin
    };
    return user;
  }

}
