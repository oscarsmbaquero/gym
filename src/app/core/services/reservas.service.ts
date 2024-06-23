//import { any } from '../models/product.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
//import { any } from '../models/ventas.models';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  
  constructor(private httpClient: HttpClient) {}
  /**
   * Obtener productos
   * @returns
   */
  public getReservas(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}reservas`);
  }

  public getReservasByDate(date: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}reservas/${date}`);
  }

  public getMisReservas(id: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}reservas/user/${id}`);
  }

  addReserva(reserva: any) {
    // Agrega el ID de usuario y la venta al payload
    const payload = {
      //idUser: this.idUser,
      reserva: reserva,
    };
    return this.httpClient.post<any>(
      `${environment.apiUrl}reservas/addReserva`,
      payload
    );
  }
}
