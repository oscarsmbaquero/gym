import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReservasService } from '../../../../core/services/store.service';
//primeng
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, OnChanges {

  @Input() dataSelected : string | undefined;

  /**
   * flag para actualizar la tabla
   */
  showChanges = false;

  constructor(
    private reservasService: ReservasService
  ){

  }


  ngOnInit(): void {
    console.log(this.dataSelected,'init');    
    this.getReservas();
  }
 

  ngOnChanges(changes: SimpleChanges) {
    const change = changes["dataSelected"];

    if (change) {
      this.showChanges = true;
      console.log(
      `New value: ${change.currentValue}`);
      this.dataSelected =  `${change.currentValue}`
      console.log(this.dataSelected);
      
    }
    this.showChanges = false;
  }

  products =[
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero'
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero'
    },
    {
      id: '1000',
      date: '06.06.2024',
      time: '16:30',
      name: 'Óscar Sánchez-Marín Baquero'
    },
    
  ]

  getReservas(){
    this.reservasService.getReservas().subscribe((element)=>{
      console.log(element);
      
    })
  }

}
