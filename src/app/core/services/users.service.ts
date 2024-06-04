import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from './models/user-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { IProduct } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})



export class UsersService {

  activeUser= '';
  
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$: Observable<IUser | null>;

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.activeUser = storedUser;
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // ngOnInit(){
  //   this.getOrderClient(this.activeUser);
  // }
  login(credentials: { user: string; password: string }): Observable<boolean> {
    const endpoint = `${environment.apiUrlMock}users/login`;
    return this.httpClient.post<IUser>(endpoint, credentials).pipe(
      map((user) => {
        if (user) {
          this.currentUserSubject.next(user);
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      })
    );
  }
/**
 * registro de usuario
 * @param credentials 
 * @returns 
 */
  register(credentials: { user: string; password: string }): Observable<boolean> {
    const endpoint = `${environment.apiUrlMock}users/register`;
    return this.httpClient.post<IUser>(endpoint, credentials).pipe(
      map((user) => {
        if (user) {
          // this.currentUserSubject.next(user);
          // localStorage.setItem('user', JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: IUser) {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearCurrentUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  getOrderClient(userId: string): Observable<any> {
    //return this.httpClient.get(`URL_DE_TU_API/pedidos/${userId}`);
    return this.httpClient.get<any[]>(`${environment.apiUrlMock}users/${userId}`);
  }

  getUSers(){
    return this.httpClient.get<IUser[]>(`${environment.apiUrlMock}users`);
  }

  getUSerById(id: string){
    return this.httpClient.get<IUser[]>(`${environment.apiUrlMock}users/${id}`);
  }
  updatedUser(id: string, userData: any): Observable<IUser[]> {
    console.log(id,userData,98)
    const url = `${environment.apiUrlMock}users/modify/${id}`;
    return this.httpClient.put<IUser[]>(url, userData);
  }

  getUSerByMail(email: string){    
    return this.httpClient.get<IUser>(`${environment.apiUrlMock}users/mail/${email}`);
  }

  resetPassword(email: string): Observable<any> {
    console.log(email);
    const url = `${environment.apiUrlMock}users/reset-password/${email}`;
    return this.httpClient.post<IUser[]>(url, email);
  }

  changePassword(id: string, nuevaContrasena: string): Observable<any> {
    //console.log(id, nuevaContrasena );
    
    return this.httpClient.post(`${environment.apiUrlMock}users/changePassword/${id}`,{ nuevaContrasena });
  }
}
