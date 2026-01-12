
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <!-- Sidebar -->
      <aside class="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 z-20 shadow-xl">
        <div class="p-6 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">B</div>
            <div>
              <p class="font-bold text-white leading-tight">AdminPanel</p>
              <p class="text-xs text-slate-500">Bawaslu Riau</p>
            </div>
          </div>
        </div>

        <nav class="p-4 space-y-2 mt-4">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-orange-600 text-white shadow-lg shadow-orange-900/20" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Statistik
          </a>
          <a routerLink="/admin/input" routerLinkActive="bg-orange-600 text-white shadow-lg shadow-orange-900/20" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Input Penomoran
          </a>
          <a routerLink="/admin/history" routerLinkActive="bg-orange-600 text-white shadow-lg shadow-orange-900/20" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
            Riwayat Naskah
          </a>
          <a routerLink="/admin/settings" routerLinkActive="bg-orange-600 text-white shadow-lg shadow-orange-900/20" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            Pengaturan
          </a>
        </nav>

        <div class="mt-auto p-4 border-t border-slate-800">
          <button (click)="logout()" class="flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all hover:bg-red-500 hover:text-white group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-180 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Keluar
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow overflow-y-auto">
        <header class="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h2 class="text-xl font-bold text-slate-800">Bawaslu Provinsi Riau</h2>
          <div class="flex items-center gap-4">
            <div class="text-right hidden sm:block">
               <p class="text-sm font-bold text-slate-800">Administrator</p>
               <p class="text-xs text-slate-500">Online</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
               <img src="https://picsum.photos/100/100?seed=admin" alt="avatar" />
            </div>
          </div>
        </header>

        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);
  logout() {
    this.authService.logout();
  }
}
