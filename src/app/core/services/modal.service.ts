// event.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private abrirModalSubject = new Subject<void>();
  private cerrarModalSubject = new Subject<void>();

  private abrirModalDetalleSubject = new Subject<void>();
  private cerrarModalDetalleSubject = new Subject<void>();
  private opinionesSubject = new BehaviorSubject<any[]>([]);


  private setOpinionesSubject = new Subject<void>();
  private getOpinionesSubject = new Subject<void>();

  abrirModal$ = this.abrirModalSubject.asObservable();
  cerrarModal$ = this.cerrarModalSubject.asObservable();
  
  abrirModalDetalle$ = this.abrirModalDetalleSubject.asObservable();
  cerrarModalDetalle$ = this.cerrarModalDetalleSubject.asObservable();

  setOpiniones$ = this.setOpinionesSubject.asObservable();
  getOpiniones$ = this.getOpinionesSubject.asObservable();

  openModalOpiniones() {
    this.abrirModalSubject.next();
  }

  closeModal() {
    this.cerrarModalSubject.next();
  }

   // Método para establecer las opiniones
   setOpiniones(opiniones: any[]) {
    this.opinionesSubject.next(opiniones);
  }

  // Método para obtener las opiniones como un observable
  getOpiniones(): Observable<any[]> {
    return this.opinionesSubject.asObservable();
  }

  openModalDetalleOpiniones(){
    this.abrirModalDetalleSubject.next();
  }

  closeModalDetalleOpiniones() {
    this.cerrarModalDetalleSubject.next();
  }
}
