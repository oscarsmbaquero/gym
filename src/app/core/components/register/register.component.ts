import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users.service';
import { Router, RouterLink } from '@angular/router';
//material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: 
      [
        CommonModule,
        ReactiveFormsModule, 
        MatCardModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule, 
        MatSelectModule, 
        MatIconModule, 
        MatSnackBarModule, 
        RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public registerUser: FormGroup;
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private userServices: UsersService, 
    private router: Router
  ){
    this.registerUser = this.formBuilder.group({
      user: ['', [Validators.required ]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      tlf: ['', [Validators.required]],
      address: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      cp: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    //this.loading = true;
    // El usuario ha pulsado en submit -> cambia a true submitted
    this.submitted = true;
    // Si el formulario es valido
    if (this.registerUser.valid) {
      // Crear un objeto de usuario con los datos del formulario
      const user: any = {
        user: this.registerUser.get('user')?.value,
        password: this.registerUser.get('password')?.value,
        repassword: this.registerUser.get('repassword')?.value,
        mail: this.registerUser.get('mail')?.value,
        tlf: this.registerUser.get('tlf')?.value,
        address: this.registerUser.get('address')?.value,
        localidad: this.registerUser.get('localidad')?.value,
        provincia: this.registerUser.get('provincia')?.value,
        cp: this.registerUser.get('cp')?.value,
      };
      if(user.password !== user.repassword){
        this.matSnackBar.open(
          'La contraseña debe de coincidir',
          'Cerrar',
          {
            duration: 5000,
          }
        );
      }else{
// Llamar al servicio para registrar al usuario
this.userServices.register(user).subscribe(
  (response) => {
    //this.loading = false;
    console.log('Datos enviados con éxito');
    // this.snackBar.open(
    //   'Usuario registrado correctamente',
    //   'Cerrar',
    //   {
    //     duration: 3000,
    //   }
    // );
    this.router.navigate(['login']);
  },
  (error) => {
    if (error.status === 500) {
      this.matSnackBar.open(
        'Ya existe un usuario con ese email',
        'Cerrar',
        {
          duration: 5000,
        }
      );
    }
  }
);
      }
    }
  }
}
