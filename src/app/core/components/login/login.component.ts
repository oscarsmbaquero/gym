import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//ANGULAR MATERIAL
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ){
    this.loginUser = this.formBuilder.group({
      mail: ['', [Validators.required ]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    console.log('Entri');
    
      // Si el formulario es valido
    if (this.loginUser.valid) {
      //TODO TIPAR
      const user: any = {
        mail: this.loginUser.get('mail')?.value,
        password: this.loginUser.get('password')?.value,
      };
      console.log(user,'user');
      
    //this.loading = true;
    // El usuario ha pulsado en submit -> cambia a true submitted
  //   this.submitted = true;
  //   // Si el formulario es valido
  //   if (this.registerUser.valid) {
  //     // Crear un objeto de usuario con los datos del formulario
  //     const user: any = {
  //       user: this.registerUser.get('user')?.value,
  //       password: this.registerUser.get('password')?.value,
  //       repassword: this.registerUser.get('repassword')?.value,
  //       mail: this.registerUser.get('mail')?.value,
  //       tlf: this.registerUser.get('tlf')?.value,
  //       address: this.registerUser.get('address')?.value,
  //       localidad: this.registerUser.get('localidad')?.value,
  //       provincia: this.registerUser.get('provincia')?.value,
  //       cp: this.registerUser.get('cp')?.value,
  //     };
  //     if(user.password !== user.repassword){
  //       this.matSnackBar.open(
  //         'La contraseña debe de coincidir',
  //         'Cerrar',
  //         {
  //           duration: 5000,
  //         }
  //       );
  //     }else{
  // // Llamar al servicio para registrar al usuario
  // this.userServices.register(user).subscribe(
  // (response) => {
  //   //this.loading = false;
  //   console.log('Datos enviados con éxito');
  //   // this.snackBar.open(
  //   //   'Usuario registrado correctamente',
  //   //   'Cerrar',
  //   //   {
  //   //     duration: 3000,
  //   //   }
  //   // );
  //   this.router.navigate(['login']);
  // },
  // (error) => {
  //   if (error.status === 500) {
  //     this.matSnackBar.open(
  //       'Ya existe un usuario con ese email',
  //       'Cerrar',
  //       {
  //         duration: 5000,
  //       }
  //     );
  //   }
  // }
  // );
  //     }
      
      
  //   }
  }
  
  }



}
