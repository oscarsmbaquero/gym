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
import {MatTabsModule} from '@angular/material/tabs';
//COMPONENTES
import { AnadirReservaComponent } from './components/anadir-reserva/anadir-reserva.component';
import { VerReservasComponent } from './components/ver-reservas/ver-reservas.component';


@Component({
  selector: 'app-reservas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatTabsModule, AnadirReservaComponent, VerReservasComponent ],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent {

  
}


