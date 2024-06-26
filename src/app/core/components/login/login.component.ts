import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { Router, RouterModule } from '@angular/router';
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
    RouterLink
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

  onSubmit(): void {
    // Si el formulario es válido
    if (this.loginUser.valid) {
      const user: any = {
        mail: this.loginUser.get('mail')?.value,
        password: this.loginUser.get('password')?.value,
      };
      this.usersService.login(user).subscribe(
        (response) => {
          // Redirige a 'home' en caso de éxito
          this.router.navigate(['']);
        },
        (error) => {
          // Si el status de la respuesta no es 200, muestra un mensaje de error
          if (error.status !== 200) {
            alert('Mal login');
            this.router.navigate(['login']);
          }
        }
      );
    }
  }
  
}
