
import { Component, inject, signal, computed } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Riwayat Naskah</h1>
          <p class="text-slate-500">Seluruh data penomoran surat yang telah diterbitkan.</p>
        </div>
        <div class="flex gap-2">
           <input type="text" placeholder="Cari perihal/nomor..." (input)="searchQuery.set($any($event.target).value)"
            class="p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 w-64 shadow-sm" />
           <button class="p-2.5 bg-slate-100 text-slate-700 rounded-lg border border-slate-300 hover:bg-slate-200">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
           </button>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nomor</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tanggal</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Klasifikasi</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tujuan</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Perihal</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Staf</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              @for (letter of filteredLetters(); track letter.id) {
                <tr class="hover:bg-slate-50 transition-colors group">
                  <td class="px-6 py-4">
                    <span class="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100">{{ letter.fullNumber }}</span>
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{{ letter.date | date:'dd/MM/yyyy' }}</td>
                  <td class="px-6 py-4">
                    <span class="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">{{ letter.classificationCode }}</span>
                  </td>
                  <td class="px-6 py-4 text-sm text-slate-600">{{ letter.destination }}</td>
                  <td class="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" [title]="letter.subject">{{ letter.subject }}</td>
                  <td class="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{{ letter.staff }}</td>
                  <td class="px-6 py-4 text-right">
                    <button (click)="deleteLetter(letter.id)" class="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="7" class="px-6 py-12 text-center text-slate-400">
                    <div class="flex flex-col items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="opacity-20"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
                       <p>Belum ada data surat.</p>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class HistoryComponent {
  private dataService = inject(DataService);
  searchQuery = signal('');

  filteredLetters = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return this.dataService.letters().filter(l => 
      l.fullNumber.toLowerCase().includes(q) || 
      l.subject.toLowerCase().includes(q) || 
      l.destination.toLowerCase().includes(q)
    );
  });

  deleteLetter(id: string) {
    if (confirm('Apakah Anda yakin ingin menghapus data nomor ini?')) {
      this.dataService.deleteLetter(id);
    }
  }
}
