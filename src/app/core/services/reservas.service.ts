//import { any } from '../models/product.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
//import { any } from '../models/ventas.models';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {

  private reservaFormSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public reservaForm$: Observable<any> = this.reservaFormSubject.asObservable();
  
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

  /**
   * Setear datos para el formulario de reserva
   * @param reserva Datos de la reserva a setear
   */
  public setReservaForm(reserva: any): void {
    console.log(reserva, 'entro');
    
    this.reservaFormSubject.next(reserva);
  }

  /**
   * Obtener los datos para el formulario reservar, si el user ha seleccionado agregar en la tabla
   * @returns Observable con los datos de la reserva
   */
  public getReservaForm(): Observable<any> {
    return this.reservaForm$;
  }
}
