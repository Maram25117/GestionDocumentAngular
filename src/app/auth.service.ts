import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkInitialLoginStatus());
  isLoggedIn$ = this.loggedIn.asObservable();
  private role: string | null = null;

  constructor() {}

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  private checkInitialLoginStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(userId: string, role: string): void {
    localStorage.setItem('authToken', userId);
    localStorage.setItem('role', role);
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }
}*/


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkInitialLoginStatus());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {}

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  private checkInitialLoginStatus(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(userId: string, role: string): void {
    localStorage.setItem('authToken', userId);
    localStorage.setItem('role', role); // Stocker le rôle
    this.loggedIn.next(true);
  }
  
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN'; // Vérifier si l'utilisateur est un ADMIN
  }
  
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

}
