import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ReservasService } from '../../../../core/services/reservas.service';
//primeng
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnChanges {
  @Input() dataSelected: string | undefined;

  /**
   * flag para actualizar la tabla
   */
  showReservas = false;

  reservasByDate:any;

  isLoading = true;
  hasData = false;



  constructor(private reservasService: ReservasService) {}

  ngOnInit(): void {
    console.log(this.dataSelected, 'init');
    //this.getReservas();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['dataSelected'];

    if (change) {
      //this.showChanges = true;
      console.log(`New value: ${change.currentValue}`);
      this.dataSelected = `${change.currentValue}`;
      console.log(this.dataSelected);
      this.obtenerReservasByDate(this.dataSelected);
    }
  }
  

  obtenerReservasByDate(date: string) {
    console.log(date);
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

  products = [
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero',
    },
  ];

  getReservas() {
    this.reservasService.getReservas().subscribe((element) => {
      console.log(element);
    });
  }
}
