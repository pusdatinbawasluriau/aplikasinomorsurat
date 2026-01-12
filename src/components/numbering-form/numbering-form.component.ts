import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-numbering-form',
  templateUrl: './numbering-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule]
})
export class NumberingFormComponent {
  dataService = inject(DataService);
  fb = inject(FormBuilder);

  klasifikasiList = this.dataService.klasifikasiList;
  lastGeneratedNumber = signal<string | null>(null);
  showSuccessModal = signal(false);

  // Signal to reactively track changes from the form control
  selectedKlasifikasiKode = signal<string | null | undefined>('');

  form = this.fb.group({
    jenisNaskah: ['', Validators.required],
    sifatNaskah: ['Biasa', Validators.required],
    tanggalSurat: [this.getTodayDate(), Validators.required],
    kodeKlasifikasi: ['', Validators.required],
    kodeTurunan: [''],
    perihal: ['', [Validators.required, Validators.minLength(10)]],
    tujuan: ['', [Validators.required, Validators.minLength(5)]],
    isiRingkas: [''],
    penandatangan: ['', Validators.required],
    staf: ['', Validators.required],
  });

  // This computed signal now correctly depends on the selectedKlasifikasiKode signal
  availableTurunan = computed(() => {
    const selectedKode = this.selectedKlasifikasiKode();
    if (!selectedKode) {
      return [];
    }
    const klasifikasi = this.klasifikasiList().find(k => k.kode === selectedKode);
    return klasifikasi?.turunan ?? [];
  });

  jenisNaskahOptions = [
    'Surat Edaran', 'Surat Tugas', 'Keputusan Ketua', 'Keputusan Sekretariat', 
    'Surat Tugas TTD Ketua', 'Surat Tugas TTD Sekretariat', 'Nota Dinas', 
    'Surat Kuasa', 'Surat Izin', 'Surat Instruksi Ketua', 
    'Surat TTD Kepala Bagian', 'Surat TTD Kordiv'
  ];

  sifatNaskahOptions = ['Biasa', 'Terbatas', 'Rahasia'];

  penandatanganOptions = [
    { nama: 'Alnofrizal', jabatan: 'Ketua' },
    { nama: 'Asmin safari Lubis', jabatan: 'Kepala Sekretariat' },
  ];

  stafOptions = [
    'Alfin Reski',
    'Andri Ali Syaputra',
    'Angga Pratama',
    'Ari Agung Prayitno',
    'Ari Setiawan',
    'Aryan Riadi',
    'Azizul Hakim',
    'Barito Grinca Pahala Silalahi',
    'Dandi Kurniawan',
    'Darussalim',
    'Eka Putri Hermayani',
    'Elvina Armista',
    'Ermalizha Putri',
    'Erwindu Budi Darma',
    'Feri Susandra',
    'Fitri Rahmadhani',
    'Habibullah',
    'Hendrianto Hermawan',
    'Hersya Nograh P',
    'Ikrima Rosyidah Sofiya',
    'Irham',
    'Isnita Aulia Safitri',
    'Laode Muhammad Aulia',
    'Liza Apriana',
    'M Hamidi Maiza',
    'M Hasanul Asy\'ary',
    'Marco Alfindo',
    'Mutiara Fritcilliana Panjaitan',
    'Nasrun Ritonga',
    'Novi Sulastri',
    'Nur Asiah',
    'Nurhuda Syah',
    'Putri Wulansari',
    'Rachmatul Azmi',
    'Rahmanesa',
    'Ressy Puspita Sari',
    'Riduwan Saputra',
    'Riki Prayogi',
    'Ririn Sulfiani',
    'Roza Fitri Yani',
    'Soni Darmujianto',
    'Sri Rezeki Kharianti',
    'Sulaiman Fakhrur Razi',
    'T Ayudea Rahmadhani',
    'Veri Hidayat',
    'Vitra Auliya',
    'Wilson Saputra',
    'Yanis Prima',
    'Zuhri',
    'Zulkarnain Nasution'
  ];

  constructor() {
    // Update the signal whenever the form control's value changes
    this.form.get('kodeKlasifikasi')?.valueChanges.subscribe(value => {
      this.selectedKlasifikasiKode.set(value);
      this.form.get('kodeTurunan')?.setValue('');
    });
  }

  getTodayDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const newSurat = this.dataService.addSurat({
        jenisNaskah: formValue.jenisNaskah!,
        sifatNaskah: formValue.sifatNaskah!,
        tanggalSurat: formValue.tanggalSurat!,
        kodeKlasifikasi: formValue.kodeKlasifikasi!,
        kodeTurunan: formValue.kodeTurunan || undefined,
        perihal: formValue.perihal!,
        tujuan: formValue.tujuan!,
        isiRingkas: formValue.isiRingkas!,
        penandatangan: formValue.penandatangan!,
        staf: formValue.staf!
      });
      this.lastGeneratedNumber.set(newSurat.nomorLengkap);
      this.showSuccessModal.set(true);
      
      this.form.reset({
        sifatNaskah: 'Biasa',
        tanggalSurat: this.getTodayDate()
      });
      // After reset, also reset the signal tracker
      this.selectedKlasifikasiKode.set('');
    } else {
      this.form.markAllAsTouched();
    }
  }

  closeModal() {
    this.showSuccessModal.set(false);
  }

  async copyAndClose() {
    const numberToCopy = this.lastGeneratedNumber();
    if (numberToCopy) {
      try {
        await navigator.clipboard.writeText(numberToCopy);
      } catch (err) {
        console.error('Gagal menyalin nomor surat: ', err);
        // Optionally handle copy error with an alert
      } finally {
        this.closeModal();
      }
    }
  }
}