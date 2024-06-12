import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
//ANGULAR MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.loginUser = this.formBuilder.group({
      mail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    // Si el formulario es valido
    if (this.loginUser.valid) {
      //TODO TIPAR
      const user: any = {
        mail: this.loginUser.get('mail')?.value,
        password: this.loginUser.get('password')?.value,
      };
      this.usersService.login(user).subscribe(
        (response) => {
          //this.loading = false;
          console.log(response,'response');
          // this.snackBar.open(
          //   'Usurio Logueado Correctamente',
          //   'Cerrar',
          //   {
          //     duration: 3000,
          //   }
          // );
          this.router.navigate(['reservas']);
        },
        (error) => {
          //this.loading = false;
          console.error('Error al enviar los datos', error);
          if(error.status !== 200){
            
          //     this.snackBar.open(
          //   'Usuario o contraseña incorrectas',
          //   'Cerrar',
          //   {
          //     duration: 3000,
          //   }
          // );
          alert('mal login')
          this.router.navigate(['login']);
          }
          console.log(error.status,'status');
        }
      );
    }
  }
}
