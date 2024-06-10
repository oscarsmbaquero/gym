import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
//SERVICIOS
import { ReservasService } from '../../../../../../core/services/reservas.service';
import { InstalacionesService } from '../../../../../../core/services/instalaciones-services';
//primeng
import { TableModule } from 'primeng/table';

interface Intervalo {
  horaInicio: string;
  horaFin: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
[x: string]: any;
  @Input() dataSelected: string | undefined;
  @Input() categoria: string | undefined;

  horasIndices: number[] | undefined;

  /**
   * flag para actualizar la tabla
   */
  showReservas = false;

  reservasByDate:any;

  isLoading = true;
  hasData = false;

  //pistas: string[] = ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4'];
  startTime: string = '09:30';
  interval: number = 1.5; // horas
  //reservationSlots: string[] = this.generateReservationSlots(this.startTime, this.interval, 10); // 10 slots para 10 intervalos de 1.5h desde las 09:30
  intervalos: Intervalo[] = [];
  instalaciones!: any[];




  constructor(
    private reservasService: ReservasService,
    private instalacionesService :InstalacionesService
  ) {

    
  }

  ngOnInit(): void {
    this.getInstalaciones();    
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['dataSelected'];
    const changeCategoria = changes['categoria'];

    if (change) {
      //this.showChanges = true;
      console.log(`New value: ${change.currentValue}`);
      this.dataSelected = `${change.currentValue}`;
      console.log(this.dataSelected);
      this.obtenerReservasByDate(this.dataSelected);
      //this.getInstalaciones();
    }
    if(changeCategoria){
      //this.obtenerReservasByDate(this.dataSelected);
      this.getInstalaciones();
    }
  }

  /**
   * Funcion para obtener las instalaciones de pistas de tennis y paddle
   */
  getInstalaciones(){    
    this.instalacionesService.getInstalaciones().subscribe((element) =>{
      this.instalaciones = element.filter(instalacion => instalacion.tipo === this.categoria);
      console.log(this.instalaciones);
    })
  }
  
  /**
   * Obtiene las reservas por fecha
   * @param date 
   */
  obtenerReservasByDate(date: string) {
    this.reservasService.getReservasByDate(date).subscribe(
      (response: any) => {
        this.reservasByDate = response;
        this.hasData = this.reservasByDate && this.reservasByDate.length > 0;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error al obtener los datos', error);
        this.isLoading = false;
      }
    );        
  }

  /**
   * Obtiene las reservas//TODO COMENTAR
   */
  getReservas() {
    this.reservasService.getReservas().subscribe((element) => {
      console.log(element);
    });    
  }


  /**
   * 
   * @param element 
   * @param nombre 
   */
  reservar(element: any, nombre: string){
    console.log('Entro', element, nombre);
    
  }
  
  
}
