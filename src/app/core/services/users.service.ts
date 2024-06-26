import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

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
    const endpoint = `${environment.apiUrl}users/login`;
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
    const endpoint = `${environment.apiUrl}users/register`;
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
    return this.httpClient.get<any[]>(`${environment.apiUrl}users/${userId}`);
  }

  getUSers(){
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}users`);
  }

  getUSerById(id: string){
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}users/${id}`);
  }
  updatedUser(id: string, userData: any): Observable<IUser[]> {
    const url = `${environment.apiUrl}users/modify/${id}`;
    return this.httpClient.put<IUser[]>(url, userData);
  }

  getUSerByMail(email: string){    
    return this.httpClient.get<IUser>(`${environment.apiUrl}users/mail/${email}`);
  }

  resetPassword(email: string): Observable<any> {
    const url = `${environment.apiUrl}users/reset-password/${email}`;
    return this.httpClient.post<IUser[]>(url, email);
  }

  changePassword(id: string, nuevaContrasena: string): Observable<any> {    
    return this.httpClient.post(`${environment.apiUrl}users/changePassword/${id}`,{ nuevaContrasena });
  }
}
