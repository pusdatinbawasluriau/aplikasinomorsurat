
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div class="bg-orange-600 p-8 text-white text-center">
          <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 class="text-2xl font-bold">Admin Portal</h1>
          <p class="text-orange-100 opacity-80">Bawaslu Provinsi Riau</p>
        </div>
        
        <div class="p-8">
          <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600">Username</label>
              <input type="text" formControlName="username" class="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="admin" />
            </div>
            
            <div class="space-y-2">
              <label class="text-sm font-semibold text-slate-600">Password</label>
              <input type="password" formControlName="password" class="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="••••••••" />
            </div>

            @if (error()) {
              <div class="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100 text-center">
                {{ error() }}
              </div>
            }

            <button type="submit" class="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-95">
              Masuk Sekarang
            </button>
          </form>

          <div class="mt-8 text-center">
            <a routerLink="/" class="text-slate-500 hover:text-orange-600 text-sm flex items-center justify-center gap-1 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Kembali ke Halaman User
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  error = signal('');
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username!, password!)) {
        this.router.navigate(['/admin']);
      } else {
        this.error.set('Username atau password salah.');
      }
    }
  }
}
