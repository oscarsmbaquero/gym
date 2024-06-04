import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';

//PRIMENG
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
//ANGULAR MATERIAL
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-reservas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatButtonModule ],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent {

  

  //formGroup: FormGroup;
  public registrarReserva: FormGroup;
  value: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
  ){
    this.registrarReserva = this.formBuilder.group({
      nombre: ['', [Validators.required ]],
      date: ['', [Validators.required ]],
      // password: ['', [Validators.required]],
      // repassword: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      tipo_reserva: ['',[Validators.required]],
      comentario: ['',[Validators.required]],
      // tlf: ['', [Validators.required]],
      // address: ['', [Validators.required]],
      // localidad: ['', [Validators.required]],
      // provincia: ['', [Validators.required]],
      // cp: ['', [Validators.required]],
    });
  }


public onSubmit(): void {
  console.log('Entri');
  
    // Si el formulario es valido
  if (this.registrarReserva.valid) {
    //TODO TIPAR
    const reserva: any = {
      date: this.registrarReserva.get('date')?.value,
      nombre: this.registrarReserva.get('nombre')?.value,
      mail: this.registrarReserva.get('mail')?.value,
      tipo_reserva: this.registrarReserva.get('tipo_reserva')?.value,
      comentario: this.registrarReserva.get('comentario')?.value,
    };
    console.log(reserva,'user');
    
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
