
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LetterFormComponent } from '../shared/letter-form.component';

@Component({
  selector: 'app-input-penomoran',
  imports: [LetterFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-4xl mx-auto space-y-6">
      <div class="mb-8">
        <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Input Penomoran Surat</h1>
        <p class="text-slate-500 mt-1">Gunakan formulir ini untuk menerbitkan nomor surat baru sesuai klasifikasi.</p>
      </div>

      <div class="shadow-xl rounded-2xl overflow-hidden border border-slate-200">
        <app-letter-form></app-letter-form>
      </div>

      <div class="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4">
        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </div>
        <div>
          <h4 class="font-bold text-blue-900 mb-1">Informasi Penomoran</h4>
          <p class="text-sm text-blue-700 leading-relaxed">
            Sistem akan secara otomatis mendeteksi urutan nomor terakhir berdasarkan Kode Klasifikasi dan Tanggal yang dipilih. 
            Jika Anda menginput surat dengan tanggal yang sama dengan surat sebelumnya, sistem akan menambahkan akhiran (.2, .3, dst).
          </p>
        </div>
      </div>
    </div>
  `
})
export class InputPenomoranComponent {}
