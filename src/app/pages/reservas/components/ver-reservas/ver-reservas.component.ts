import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
//COMPONENTES
import { PistaComponent } from './components/pista/pista.component';

import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-ver-reservas',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,ReactiveFormsModule, MatCardModule, PistaComponent],
  templateUrl: './ver-reservas.component.html',
  styleUrl: './ver-reservas.component.scss'
})
export class VerReservasComponent {

  categoria = '';
  showCalendar = false;

  category = [
    'Paddel',
    'Tennis',
    'Gymnasio',
    'Otro',
  ];

  selectCategory(event: string){    
    this.showCalendar = true;
    this.categoria = event;
  }

}
