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
    // const user = localStorage.getItem('user');
    // if (user !== null) {
    //   const objetoJSON = JSON.parse(user);
    //   this.idUser = objetoJSON.data.id;
    // }

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

  // addReserva(body: any): Observable<any> {
  //   const formData = new FormData();
  //   console.log(body, 'bodyasdad');
  //   formData.append('date', body.date);
  //   formData.append('nombre', body.nombre);
  //   formData.append('mail', body.mail);
  //   formData.append('n_pista', body.n_pista);
  //   formData.append('tipo_reserva', body.tipo_reserva);
  //   // formData.append('iva', body.iva);
  //   // formData.append('priceFinal', body.priceFinal);
  //   // formData.append('image', body.image);
  //   //formData.append('date', body.date);

  //   return this.httpClient.post<any>(
  //     `${environment.apiUrl}reservas/addReserva`,
  //     formData
  //   );
  // }
}
