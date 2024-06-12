import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
//SERVICIOS
import { InstalacionesService } from '../../../../core/services/instalaciones-services';
import { ReservasService } from '../../../../core/services/reservas.service';
import { UsersService } from '../../../../core/services/users.service';

//PRIMENG
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
//ANGULAR MATERIAL
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-anadir-reserva',
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
    MatTabsModule,
    CommonModule,
  ],
  providers: [DatePipe],
  templateUrl: './anadir-reserva.component.html',
  styleUrl: './anadir-reserva.component.scss',
})
export class AnadirReservaComponent implements OnInit {
  //formGroup: FormGroup;
  public registrarReserva: FormGroup;
  value: string | undefined;

  pistasDisponibles: any[] = [];
  reservasPorDia: any;
  horasDisponibles: any[] = [];
  horasDisponiblesPorPista: any[] = [];
  activeUser: any;
  userName: string = '';
  userMail: string = '';

  reservasDefecto =['09:30-11:00', '11:00-12:30', '12:30-14:00', '14:00-15:30', '15:30-17:00', '17:00-18:30', '18:30-20:00', '20:00-21:30']

  constructor(
    private formBuilder: FormBuilder,
    private instalacionesService: InstalacionesService,
    private reservasService: ReservasService,
    private datePipe: DatePipe,
    private usersService: UsersService
  ) {
    this.registrarReserva = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      date: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      tipo_reserva: ['', [Validators.required]],
      n_pista: [{ value: '', disabled: true }],
      comentario: [''],
      hora: ['', [Validators.required]],
    });
    //suscribimos a los campos del campo fecha
    this.registrarReserva.get('date')?.valueChanges.subscribe((value) => {
      this.reservasByDate(value);
    });
    //suscribimos a los campos del campo tipo de reserva
    this.registrarReserva
      .get('tipo_reserva')
      ?.valueChanges.subscribe((value) => {
        this.actualizarPistasDisponibles(value);
        //this.verHorasDisponiblesReservas();
      });
      //suscribimos a los campos del n de pista
    this.registrarReserva.get('n_pista')?.valueChanges.subscribe((value) => {
      this.horasDisponiblesPorPista = this.horasDisponiblesPista(value);      
    });
  }

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe((user) => {
      this.activeUser = user;        
      this.userName = this.activeUser.data.user;
      this.userMail = this.activeUser.data.mail;
      this.registrarReserva.patchValue({
        nombre: this.userName,
        mail: this.userMail
      });
      console.log(this.userName, this.userMail,'user');
        
      
      // if (this.activeUser) {
      //   this.activeUserName = this.activeUser.data.user;
      //   this.lettersAvatar(this.activeUserName);
      //   this.obtenerPedidos();
      // }
    });
  }
  reservasByDate(fecha: string) {
    fecha = this.convertDate(fecha);
    this.reservasService.getReservasByDate(fecha).subscribe((fecha) => {
      this.reservasPorDia = fecha;
      //console.log(this.reservasPorDia);
      this.horasDisponibles = this.obtenerHorasDisponibles(this.reservasPorDia);
    });
  }
  obtenerHorasDisponibles(
    reservas: any[]
  ): { pista: string; horas: string[] }[] {
    // Crear un objeto para almacenar las horas disponibles agrupadas por pista
    let horasPorPista: { [key: string]: string[] } = {};
    // Iterar sobre cada reserva para excluir las horas no disponibles
    reservas.forEach((reserva) => {
      // Obtener el identificador de la pista de la reserva actual
      const pista = reserva.instalacion.nombre;
      // Verificar si el número de usuarios apuntados y el número máximo de usuarios permitidos son iguales
      if (reserva.usuarios_apuntados === reserva.n_usuarios) {
        // Obtener el rango de horas de la reserva
        const horaInicioReserva = reserva.horaInicio;
        const horaFinReserva = reserva.horaFin;

        // Eliminar el rango de horas de la reserva de la lista de horas disponibles
        if (!horasPorPista[pista]) {
          // Si la pista aún no está en el objeto, inicializar su array de horas
          horasPorPista[pista] = reserva.instalacion.horas.filter(
            (hora: string) => {
              const horaInicio = hora.split('-')[0].trim();
              const horaFin = hora.split('-')[1].trim();
              return !(
                horaInicio === horaInicioReserva && horaFin === horaFinReserva
              );
            }
          );
        } else {
          // Si la pista ya está en el objeto, filtrar sus horas disponibles
          horasPorPista[pista] = horasPorPista[pista].filter((hora) => {
            const horaInicio = hora.split('-')[0].trim();
            const horaFin = hora.split('-')[1].trim();
            return !(
              horaInicio === horaInicioReserva && horaFin === horaFinReserva
            );
          });
        }
      }
    });

    // Convertir el objeto de horas por pista a un array de objetos
    const horasPorPistaArray: { pista: string; horas: string[] }[] = [];
    for (const pista in horasPorPista) {
      if (horasPorPista.hasOwnProperty(pista)) {
        horasPorPistaArray.push({ pista, horas: horasPorPista[pista] });
      }
    }

    return horasPorPistaArray;
  }

  /**
   * Obtiene las pistas filtrado por el campo tipo de reserva, pinta el select "Selecciona Pista"
   * @param tipo_reserva 
   */
  actualizarPistasDisponibles(tipo_reserva: string) {
    if (tipo_reserva) {
      this.instalacionesService
        .getInstalacionesByType(tipo_reserva)
        .subscribe((pistas) => {
          this.pistasDisponibles = pistas;
          this.registrarReserva.get('n_pista')?.enable();
          this.registrarReserva.get('n_pista')?.setValue('');
        });
    } else {
      this.pistasDisponibles = [];
      this.registrarReserva.get('n_pista')?.disable();
      this.registrarReserva.get('n_pista')?.setValue('');
    }
  }
  
  /**
   * Filtra las reservas disponibles 
   * @param pistaBuscada 
   * @returns 
   */
  horasDisponiblesPista(pistaBuscada: string): any | undefined {
     const ejemplo = ['09:30-11:00', '09:30-11:00']
    const pistaBuscadaNormalized = pistaBuscada.trim().toLowerCase();
    console.log('Buscando:', pistaBuscadaNormalized);
    for (const pista of this.horasDisponibles) {
      const pistaNormalized = pista.pista.trim().toLowerCase();
      console.log('Comparando con:', pistaNormalized);
      if (pistaNormalized === pistaBuscadaNormalized) {
        return pista.horas;
      }
    }
    return this.reservasDefecto;
  }


  public onSubmit(): void {
    // Si el formulario es valido
    if (this.registrarReserva.valid) {
      //TODO TIPAR
      const reserva: any = {
        date: this.registrarReserva.get('date')?.value,
        nombre: this.registrarReserva.get('nombre')?.value,
        mail: this.registrarReserva.get('mail')?.value,
        tipo_reserva: this.registrarReserva.get('tipo_reserva')?.value,
        n_pista: this.registrarReserva.get('n_pista')?.value,
        comentario: this.registrarReserva.get('comentario')?.value,
        hora: this.registrarReserva.get('hora')?.value,
      };
      //convertir la fecha 
      reserva.date = this.convertDate(reserva.date);
      console.log(reserva);
      this.reservasService.addReserva(reserva).subscribe((element) =>{
        console.log(element);
        
      })
      
    }
  }
  /**
   * Transformar fecha
   * @param inputDate
   * @returns
   */
  convertDate(inputDate: any): string {
    const date = new Date(inputDate);
    const transformedDate = this.datePipe.transform(date, 'dd.MM.yyyy');
    return transformedDate ? transformedDate : ''; // Maneja el caso en que transformedDate es null
  }
}
