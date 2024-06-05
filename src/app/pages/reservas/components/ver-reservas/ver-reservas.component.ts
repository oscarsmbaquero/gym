import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-ver-reservas',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatCardModule],
  templateUrl: './ver-reservas.component.html',
  styleUrl: './ver-reservas.component.scss'
})
export class VerReservasComponent {

}
