import { Injectable, signal, effect } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'is_authenticated';
  isAuthenticated = signal<boolean>(false);

  constructor(private router: Router) {
    const storedAuth = localStorage.getItem(this.AUTH_KEY);
    this.isAuthenticated.set(storedAuth === 'true');

    effect(() => {
      localStorage.setItem(this.AUTH_KEY, this.isAuthenticated().toString());
    });
  }

  login(username: string, password: string):boolean {
    if (username === 'admin' && password === 'bawaslu2026') {
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
