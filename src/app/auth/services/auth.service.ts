import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserControllerService } from 'destino/api/userController.service';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SuscripcionService } from 'src/app/home/services/suscripcion.service';
import { environment } from 'src/environments/environment';

export interface IUser {
  username: string;
  email: string;
  id: string;
  admin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokenService: TokenService,
    private controllerUser: UserControllerService,
    private router: Router,
    private http: HttpClient,
    private suscripcionService: SuscripcionService
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
      tap((response: any) => {
        this.tokenService.saveToken(response.token, response.admin);
        setTimeout(() => this.router.navigateByUrl('/'), 300);
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

  getLoggedUser(): IUser {
    const user: IUser = this.tokenService.getUser();
    if (! user) {
      this.logout();
      return;
    }
    return user;
  }

  postSocialLogin(data: any) {
    return this.http.post(`${environment.API_BASE_PATH}/users/postSocialLogin`, data).pipe(
      tap((response: any) => {
        this.tokenService.saveToken(response.token, response.admin);
        this.router.navigateByUrl('/');
      })
    );
  }

  isPremium(): Promise<boolean> {
    return this.suscripcionService.isMonthPaid().toPromise();
  }
}
