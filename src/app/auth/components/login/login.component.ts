import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserControllerService } from 'destino';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private controllerUser: UserControllerService,
    private tokerservice: TokenService,
    private activeRouter: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {
    if (this.form.valid) {

      const request = {
        email: this.form.value.email,
        password: this.form.value.password
      };

      this.controllerUser.userControllerLogin(request).subscribe((response) => {
        this.tokerservice.saveToken(response.token);
        this.activeRouter.navigateByUrl('/');
      });
    }

  }
}
