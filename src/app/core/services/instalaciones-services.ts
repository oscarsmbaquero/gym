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
export class InstalacionesService {
  
  constructor(private httpClient: HttpClient) {}
  /**
   * Obtener productos
   * @returns
   */
  public getInstalaciones(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}instalaciones`);
  }

  public getInstalacionesByType(tipo: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}instalaciones/${tipo}`);
  }

  
}
