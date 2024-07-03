import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../core/services/users.service';
//PRIMENG
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [TableModule, CommonModule, BadgeModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit {

  //TODO TIPAR
  clientes: any;

  constructor(
    private usersService: UsersService
  ){

  }

  ngOnInit(): void {
    this.getClientes();
  }


  private getClientes(){
     this.usersService.getUSers().subscribe((element) =>{
      console.log(element);
      this.clientes = element;      
     });
  }

}
