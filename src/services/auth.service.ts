
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(localStorage.getItem('bawaslu_auth') === 'true');

  constructor(private router: Router) {}

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === 'bawaslu2026') {
      this.isLoggedIn.set(true);
      localStorage.setItem('bawaslu_auth', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn.set(false);
    localStorage.removeItem('bawaslu_auth');
    this.router.navigate(['/login']);
  }
}
