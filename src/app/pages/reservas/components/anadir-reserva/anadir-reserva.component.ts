import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
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
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
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
    MessagesModule,
  ],
  providers: [DatePipe, provideNativeDateAdapter()],
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
  userId: string = '';
  messages!: Message[];
  showMessage = false;
  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date();
  minDateValue : any;

  reservasDefecto = [
    '09:30-11:00',
    '11:00-12:30',
    '12:30-14:00',
    '14:00-15:30',
    '15:30-17:00',
    '17:00-18:30',
    '18:30-20:00',
    '20:00-21:30',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private instalacionesService: InstalacionesService,
    private reservasService: ReservasService,
    private datePipe: DatePipe,
    private usersService: UsersService,
    private router: Router,
  ) {
    this.registrarReserva = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      date: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      tipo_reserva: ['', [Validators.required]],
      n_pista: [{ value: '', disabled: true }],
      comentario: [''],
      hora: [{value :'',  disabled: true}, [Validators.required]],
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
      this.registrarReserva.get('hora')?.enable();
    });
  }

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe((user) => {
      this.activeUser = user;
      this.userName = this.activeUser.data.user;
      this.userMail = this.activeUser.data.mail;
      this.userId = this.activeUser.data.id;
      //emitimos los valores para pintar los valores de mail y nombre
      this.registrarReserva.patchValue({
        nombre: this.userName,
        mail: this.userMail,
      });
    });
    this.minDateValue = new Date();
    // this.messages = [
    //   { severity: 'info', detail: 'Info Message' },
    //   { severity: 'success', detail: 'Success Message' },]
  }

  /**
   * Obtiene las reservas por fecha
   * @param fecha
   */
  reservasByDate(fecha: string) {    
    fecha = this.convertDate(fecha);
    this.reservasService.getReservasByDate(fecha).subscribe((fecha) => {
      this.reservasPorDia = fecha;
      this.horasDisponibles = this.obtenerHorasDisponibles(this.reservasPorDia);      
    });
  }

  /**
   * Obtiene las horas disponibles de cada pista
   * @param reservas
   * @returns
   */
  obtenerHorasDisponibles(
    reservas: any[]
  ): { pista: string; id: any; horas: string[] }[] {
    // Crear un objeto para almacenar las horas disponibles agrupadas por pista
    let horasPorPista: { [key: string]: { id: string; horas: string[] } } = {};
    // Iterar sobre cada reserva para excluir las horas no disponibles
    reservas.forEach((reserva) => {
      // Obtener el identificador y nombre de la pista de la reserva actual
      const pista = reserva.instalacion.nombre;
      const pistaId = reserva.instalacion._id;
      // Obtener el rango de horas de la reserva
      const horaInicioReserva = reserva.horaInicio;
      const horaFinReserva = reserva.horaFin;
      // Inicializa las horas de la pista si aún no está en el objeto
      if (!horasPorPista[pista]) {
        horasPorPista[pista] = {
          id: pistaId,
          horas: [...reserva.instalacion.horas],
        };
      }
      // Verifica si el número de usuarios apuntados y el número máximo de usuarios permitidos son iguales
      if (reserva.usuarios_apuntados === reserva.n_usuario) {
        // Eliminar el rango de horas de la reserva de la lista de horas disponibles
        horasPorPista[pista].horas = horasPorPista[pista].horas.filter(
          (hora: string) => {
            const [horaInicio, horaFin] = hora.split('-').map((h) => h.trim());
            return !(
              horaInicio === horaInicioReserva && horaFin === horaFinReserva
            );
          }
        );
      }
    });
    // Convertir el objeto a un array de resultados
    return Object.entries(horasPorPista).map(([pista, data]) => ({
      pista: pista,
      id: data.id,
      horas: data.horas,
    }));
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
    const pistaBuscadaNormalized = pistaBuscada.trim().toLowerCase();
    console.log('Buscando:', pistaBuscadaNormalized);
    for (const pista of this.horasDisponibles) {
      console.log(pista);

      const pistaNormalized = pista.id.trim().toLowerCase();
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
        //nombre: this.registrarReserva.get('nombre')?.value,
        nombre: this.userId,
        mail: this.registrarReserva.get('mail')?.value,
        tipo_reserva: this.registrarReserva.get('tipo_reserva')?.value,
        n_pista: this.registrarReserva.get('n_pista')?.value,
        comentario: this.registrarReserva.get('comentario')?.value,
        hora: this.registrarReserva.get('hora')?.value,
      };
      //convertir la fecha
      reserva.date = this.convertDate(reserva.date);
      this.reservasService.addReserva(reserva).subscribe((element) => {
        if (element.status === 201) {
          this.showMessage = true;
          this.messages = [
            // { severity: 'info', detail: 'Info Message' },
            { severity: 'success', detail: 'Reserva efectuada con exito' },
          ];
        }
        if (element.status === 200) {
          this.showMessage = true;
          this.messages = [
            // { severity: 'info', detail: 'Info Message' },
            { severity: 'info', detail: 'Has sido añadido a la reserva' },
          ];
        }
        setTimeout(() => {
          this.router.navigate(['home'])
        }, 1000);
      });
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

   filtrarHorasAnteriores(arrayHoras: any) {
    // Obtener la hora actual
    let horaActual = new Date();

    // Filtrar los rangos de horas
    let horasFiltradas = arrayHoras.filter((rango: string) => {
        // Dividir el rango en inicio y fin
        let partes = rango.split('-');
        let horaInicio = partes[0].trim();
        let horaFin = partes[1].trim();

        // Convertir las horas a objetos Date
        let horaInicioDate = new Date();
        let horaFinDate = new Date();

        // Establecer horas y minutos para cada objeto Date
        horaInicioDate.setHours(parseInt(horaInicio.split(':')[0]));
        horaInicioDate.setMinutes(parseInt(horaInicio.split(':')[1]));

        horaFinDate.setHours(parseInt(horaFin.split(':')[0]));
        horaFinDate.setMinutes(parseInt(horaFin.split(':')[1]));

        // Comparar con la hora actual
        return horaFinDate > horaActual;
    });

    // Formatear las horas filtradas de nuevo a strings
    let horasFiltradasStrings = horasFiltradas.map((rango: any) => rango);

    return horasFiltradasStrings;
}
}
