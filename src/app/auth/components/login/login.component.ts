import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    this.loading = true;
    this.error = null;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (this.loginForm.valid) {
      this.authService.login(username, password).subscribe(
        response => console.log(response),
        error => {
          this.loading = false;
          console.log(error);
          if (error.code === 'UserNotFoundException') { this.error = 'El usuario no existe'; }
          if (error.code === 'NotAuthorizedException') { this.error = 'Nombre de usuario o contraseña incorrecto'; }
          else { this.error = error.message; }
        }
      );
    }
  }

}
