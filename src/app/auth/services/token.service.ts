import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  signOut(): void {
    localStorage.removeItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

}