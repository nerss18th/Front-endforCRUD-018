import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal<boolean>(this.checkAuthStatus());

  constructor(private router: Router) {}

  private checkAuthStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAuthenticated() {
    return this.isAuthenticatedSignal();
  }

  login(username: string, password: string): boolean {
    // Mock authentication
    if (username === 'admin' && password === 'password123') {
      localStorage.setItem('isLoggedIn', 'true');
      this.isAuthenticatedSignal.set(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/login']);
  }
}
