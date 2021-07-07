import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService as OwnAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  error: string;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: OwnAuthService,
    private socialAuthService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    this.loading = true;
    this.error = null;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (this.loginForm.valid) {
      this.authService.login(email, password).subscribe(
        response => console.log(response),
        error => {
          this.loading = false;
          console.log(error);
          if (error.code === 'UserNotFoundException') { this.error = 'El usuario no existe'; }
          if (error.code === 'NotAuthorizedException') { this.error = 'Nombre de usuario o contraseña incorrecto'; }
          if (error.status === 401) { this.error = 'Usuario o contraseña incorrecto'; }
          else { this.error = error.message; }
        }
      );
    }
  }


  googleLogin() {
    this.loading = true;
    this.error = null;
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState
      .subscribe((user) => {
        if (user) {
          console.log('user: ', user);
          this.authService.postSocialLogin({
            username: user.name,
            email: user.email,
            profileImage: user.photoUrl,
            googleId: user.id
          }).subscribe((res) => {
            console.log(res);
          });
        }
      });
  }
}
