
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LetterFormComponent } from '../shared/letter-form.component';

@Component({
  selector: 'app-user-page',
  imports: [LetterFormComponent, RouterLink],
  template: `
    <div class="min-h-screen bg-slate-50">
      <header class="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div class="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <div class="flex items-center gap-3">
             <div class="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
             <div>
               <h1 class="text-xl font-bold text-slate-800 leading-tight">Penomoran Surat</h1>
               <p class="text-xs font-semibold text-slate-500 uppercase tracking-widest">Bawaslu Riau</p>
             </div>
          </div>
          <a routerLink="/login" class="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-all border border-slate-200 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            Admin Login
          </a>
        </div>
      </header>

      <main class="max-w-4xl mx-auto px-4 py-12">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-extrabold text-slate-900 mb-4">Layanan Penomoran Mandiri</h2>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">Silakan lengkapi formulir di bawah ini untuk mendapatkan nomor surat resmi Bawaslu Provinsi Riau secara otomatis.</p>
        </div>

        <app-letter-form></app-letter-form>

        <footer class="mt-16 text-center text-slate-400 text-sm">
          <p>&copy; 2024 Badan Pengawas Pemilihan Umum Provinsi Riau. All rights reserved.</p>
        </footer>
      </main>
    </div>
  `
})
export class UserPageComponent {}
