
import { Component, inject, input, output, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Classification } from '../../models/types';

@Component({
  selector: 'app-letter-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span class="p-2 bg-orange-100 text-orange-600 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
        </span>
        Input Penomoran Surat
      </h2>

      @if (successMessage()) {
        <div class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex justify-between items-center">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
            <div>
               <p class="font-bold">Berhasil!</p>
               <p class="text-sm">Nomor Surat: <span class="font-mono bg-white px-1 border rounded">{{ successMessage() }}</span></p>
            </div>
          </div>
          <button (click)="successMessage.set('')" class="text-green-500 hover:text-green-700">✕</button>
        </div>
      }

      <form [formGroup]="letterForm" (ngSubmit)="onSubmit()" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-700">Jenis Naskah</label>
          <select formControlName="type" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all">
            @for (type of naskahTypes; track type) {
              <option [value]="type">{{ type }}</option>
            }
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-700">Sifat Naskah</label>
          <select formControlName="priority" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all">
            <option value="Biasa">Biasa</option>
            <option value="Terbatas">Terbatas</option>
            <option value="Rahasia">Rahasia</option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-700">Tanggal Surat</label>
          <input type="date" formControlName="date" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-700">Kode Klasifikasi</label>
          <select formControlName="classificationCode" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all">
            @for (item of classifications(); track item.id) {
              <option [value]="item.code">{{ item.code }} - {{ item.name }}</option>
            }
          </select>
        </div>

        @if (selectedClassification()?.subCodes?.length) {
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-700">Sub Kode</label>
            <select formControlName="subCode" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all">
              <option value="">Tanpa Sub Kode</option>
              @for (sub of selectedClassification()?.subCodes; track sub.id) {
                <option [value]="sub.code">{{ sub.code }} - {{ sub.name }}</option>
              }
            </select>
          </div>
        }

        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium text-slate-700">Tujuan (Min 5 huruf)</label>
          <input type="text" formControlName="destination" placeholder="Contoh: Bawaslu RI, KPU Riau..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
          @if (letterForm.get('destination')?.touched && letterForm.get('destination')?.errors?.['minlength']) {
            <p class="text-xs text-red-500">Minimal 5 karakter</p>
          }
        </div>

        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium text-slate-700">Perihal (Min 10 huruf)</label>
          <textarea formControlName="subject" rows="2" placeholder="Tuliskan perihal surat secara singkat..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"></textarea>
          @if (letterForm.get('subject')?.touched && letterForm.get('subject')?.errors?.['minlength']) {
            <p class="text-xs text-red-500">Minimal 10 karakter</p>
          }
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-700">Penandatanganan</label>
          <select formControlName="signatory" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all">
            <option value="Alnofrizal (Ketua)">Alnofrizal (Ketua)</option>
            <option value="Asmin Safari Lubis (Kepala Sekretariat)">Asmin Safari Lubis (Kepala Sekretariat)</option>
            <option value="Kepala Bagian">Kepala Bagian</option>
            <option value="Kordiv">Kordiv</option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-700">Nama Staf</label>
          <select formControlName="staff" class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all">
            @for (staf of staffNames; track staf) {
              <option [value]="staf">{{ staf }}</option>
            }
          </select>
        </div>

        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium text-slate-700">Isi Ringkasan</label>
          <textarea formControlName="summary" rows="3" placeholder="Ringkasan isi surat..." class="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"></textarea>
        </div>

        <div class="md:col-span-2 pt-4">
          <button type="submit" [disabled]="letterForm.invalid || isSubmitting()" 
            class="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2">
            @if (isSubmitting()) {
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Memproses...
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              Dapatkan Nomor Surat
            }
          </button>
        </div>
      </form>
    </div>
  `
})
export class LetterFormComponent {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  
  onSuccess = output<void>();
  
  classifications = this.dataService.classifications;
  isSubmitting = signal(false);
  successMessage = signal('');

  naskahTypes = [
    'Surat Edaran', 'Surat Tugas', 'Keputusan Ketua', 'Keputusan Sekretariat', 
    'Surat Tugas TTD Ketua', 'Surat Tugas TTD Sekretariat', 'Nota Dinas', 
    'Surat Kuasa', 'Surat Izin', 'Surat Instruksi Ketua', 
    'Surat TTD Kepala Bagian', 'Surat TTD Kordiv'
  ];

  staffNames = [
    'Rachmatul Azmi', 'Nur Asiah', 'Dandi Kurniawan', 'Fitri Rahmadhani'
  ];

  letterForm = this.fb.group({
    type: ['Surat Tugas', Validators.required],
    priority: ['Biasa', Validators.required],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    classificationCode: ['PM', Validators.required],
    subCode: [''],
    subject: ['', [Validators.required, Validators.minLength(10)]],
    destination: ['', [Validators.required, Validators.minLength(5)]],
    summary: [''],
    signatory: ['Alnofrizal (Ketua)', Validators.required],
    staff: ['Rachmatul Azmi', Validators.required]
  });

  selectedClassification = computed(() => {
    const code = this.letterForm.get('classificationCode')?.value;
    return this.classifications().find(c => c.code === code);
  });

  onSubmit() {
    if (this.letterForm.valid) {
      this.isSubmitting.set(true);
      // Simulate small delay
      setTimeout(() => {
        const val: any = this.letterForm.value;
        const newLetter = this.dataService.addLetter(val);
        this.successMessage.set(newLetter.fullNumber);
        this.isSubmitting.set(false);
        this.onSuccess.emit();
        this.letterForm.patchValue({
          subject: '',
          destination: '',
          summary: ''
        });
        this.letterForm.markAsPristine();
        this.letterForm.markAsUntouched();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
    }
  }
}
