import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserControllerService } from 'destino/api/userController.service';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokenService: TokenService,
    private controllerUser: UserControllerService,
    private router: Router
  ) { }

  isLoggedIn(): boolean {
    return this.tokenService.getToken() != null;
  }

  login(email: string, password: string) {

    const request = {
      email,
      password
    };
    return this.controllerUser.userControllerLogin(request).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.token);
        this.router.navigateByUrl('/');
      })
    );
  }

  signUp(username: string, email: string, password: string) {

    return this.controllerUser.userControllerSignUp({
      username,
      email,
      password
    });
  }

  logout() {
    this.tokenService.signOut();
    this.router.navigateByUrl('');
  }
}
