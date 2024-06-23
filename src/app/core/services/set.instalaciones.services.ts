import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetinstalacionesService {

  // BehaviorSubject para mantener el estado de las instalaciones
 // private instalacionesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private instalacionesSubject = new BehaviorSubject<any[]>([]);
  
  // Observable expuesto públicamente
  //public instalaciones$: Observable<any[]> = this.instalacionesSubject.asObservable();

  instalaciones$ = this.instalacionesSubject.asObservable();
  

  constructor() { }

  // Método para setear las instalaciones con la reserva y usuario
  setUsuariosReserva(instalaciones: any[]): void {
    this.instalacionesSubject.next(instalaciones);
  }

  // Método para obtener las instalaciones ya reservas actuales como un Observable

  getUsuariosReserva(): Observable<any[]> {
    //return this.instalacionesSubject.asObservable();
    return this.instalacionesSubject.asObservable();
    //return this.instalaciones$;
  }

}
