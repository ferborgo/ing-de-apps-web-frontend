import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  mensaje: string;
  error: string;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.mensaje = null;
    this.error = null;

    const values = this.registerForm.value;
    console.log(values);
    this.authService.signUp(values.username, values.email, values.password)
      .subscribe(
        response => {
          console.log('Response: ', response);
          this.loading = false;
          this.mensaje = 'El registro fue exitoso. ¡Ya podés iniciar sesión!';
          this.registerForm.reset();
        },
        error => {
          console.log('Error: ', error);
          this.loading = false;
          this.error = error.message;
        }
      );
  }

}
