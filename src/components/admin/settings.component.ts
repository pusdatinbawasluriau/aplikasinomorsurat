
import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Classification } from '../../models/types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Pengaturan Klasifikasi</h1>
          <p class="text-slate-500">Kelola kode surat dan turunan klasifikasi.</p>
        </div>
      </div>

      <!-- Add Main Classification -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 class="text-lg font-bold text-slate-800 mb-4">Tambah Klasifikasi Baru</h2>
        <div class="flex flex-col md:flex-row gap-4">
          <input type="text" [(ngModel)]="newClassCode" placeholder="Kode (mis: PM)" class="flex-1 md:flex-[0.3] p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500" />
          <input type="text" [(ngModel)]="newClassName" placeholder="Nama Klasifikasi" class="flex-1 p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500" />
          <button (click)="addClass()" class="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors">
            Tambah
          </button>
        </div>
      </div>

      <!-- Classification List & Sub Codes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
          <div class="p-4 bg-slate-50 border-b border-slate-200">
            <h3 class="font-bold text-slate-700">Daftar Klasifikasi</h3>
          </div>
          <div class="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            @for (item of classifications(); track item.id) {
              <div 
                (click)="selectedClass.set(item)"
                [class.bg-orange-50]="selectedClass()?.id === item.id"
                class="p-4 hover:bg-slate-50 cursor-pointer transition-colors flex items-center justify-between group">
                <div>
                  <span class="font-bold text-orange-600 mr-2">{{ item.code }}</span>
                  <span class="text-slate-700 text-sm">{{ item.name }}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-300 group-hover:text-slate-500"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            }
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
          @if (selectedClass(); as item) {
            <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 class="font-bold text-slate-700">Sub Kode: {{ item.code }}</h3>
              <span class="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-bold">{{ item.subCodes.length }} Item</span>
            </div>
            <div class="p-4 space-y-4">
              <div class="flex gap-2">
                <input type="text" [(ngModel)]="newSubCode" placeholder="Kode Turunan (mis: 01.00)" class="flex-1 p-2 border border-slate-300 rounded outline-none text-sm" />
                <button (click)="addSub()" class="px-3 py-2 bg-slate-800 text-white text-sm rounded hover:bg-slate-900 transition-colors">Tambah</button>
              </div>
              <div class="divide-y divide-slate-100 border rounded border-slate-100">
                @for (sub of item.subCodes; track sub.id) {
                  <div class="p-3 text-sm flex items-center justify-between">
                    <span class="font-mono text-orange-600 font-semibold">{{ sub.code }}</span>
                    <span class="text-slate-500">{{ sub.name || 'Umum' }}</span>
                  </div>
                } @empty {
                  <p class="p-6 text-center text-slate-400 text-sm">Belum ada kode turunan.</p>
                }
              </div>
            </div>
          } @else {
            <div class="p-12 text-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 opacity-20"><polyline points="9 18 15 12 9 6"/></svg>
              <p>Pilih klasifikasi untuk mengelola sub kode.</p>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent {
  private dataService = inject(DataService);
  classifications = this.dataService.classifications;
  selectedClass = signal<Classification | null>(null);

  newClassCode = '';
  newClassName = '';
  newSubCode = '';

  addClass() {
    if (this.newClassCode && this.newClassName) {
      this.dataService.addClassification(this.newClassCode, this.newClassName);
      this.newClassCode = '';
      this.newClassName = '';
    }
  }

  addSub() {
    const current = this.selectedClass();
    if (current && this.newSubCode) {
      this.dataService.addSubCode(current.id, this.newSubCode, 'Umum');
      this.newSubCode = '';
      // Refresh local view
      this.selectedClass.set(this.classifications().find(c => c.id === current.id) || null);
    }
  }
}
