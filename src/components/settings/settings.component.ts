import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Klasifikasi } from '../../types';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class SettingsComponent implements OnInit {
  dataService = inject(DataService);
  klasifikasiList = this.dataService.klasifikasiList;
  isDataReady = signal(false);

  // State for adding new main code
  newKlasifikasiKode = signal('');
  newKlasifikasiDeskripsi = signal('');

  // State for adding new sub-code (turunan)
  selectedKlasifikasi = signal<Klasifikasi | null>(null);
  newTurunanKode = signal('');
  newTurunanDeskripsi = signal('');

  // State for data management
  importError = signal<string|null>(null);

  // State for Google Sheets sync
  scriptUrlInput = signal('');
  testStatus = signal<'idle' | 'testing' | 'success' | 'error'>('idle');

  googleAppsScriptCode = `const SHEET_NAME = "Data Penomoran";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error("Sheet dengan nama '" + SHEET_NAME + "' tidak ditemukan.");
    }
    
    const suratData = JSON.parse(e.postData.contents);
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID", "Nomor Lengkap", "Tanggal Surat", "Jenis Naskah",
        "Sifat Naskah", "Kode Klasifikasi", "Kode Turunan", "Perihal",
        "Tujuan", "Isi Ringkas", "Penandatangan", "Staf", "Timestamp"
      ]);
    }
    
    sheet.appendRow([
      suratData.id || '', suratData.nomorLengkap || '', suratData.tanggalSurat || '',
      suratData.jenisNaskah || '', suratData.sifatNaskah || '', suratData.kodeKlasifikasi || '',
      suratData.kodeTurunan || '', suratData.perihal || '', suratData.tujuan || '',
      suratData.isiRingkas || '', suratData.penandatangan || '', suratData.staf || '',
      new Date(suratData.createdAt).toISOString()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  async ngOnInit(): Promise<void> {
    // DataService loads from storage in its constructor, but we ensure it's loaded
    // by using a microtask delay before we consider data ready.
    await Promise.resolve(); // Wait for one tick to ensure service is initialized
    this.scriptUrlInput.set(this.dataService.googleScriptUrl() || '');
    this.isDataReady.set(true);
  }

  addKlasifikasi() {
    const kode = this.newKlasifikasiKode().trim().toUpperCase();
    const deskripsi = this.newKlasifikasiDeskripsi().trim();
    if (kode && deskripsi && !this.klasifikasiList().find(k => k.kode === kode)) {
      this.dataService.addKlasifikasi(kode, deskripsi);
      this.newKlasifikasiKode.set('');
      this.newKlasifikasiDeskripsi.set('');
    }
  }

  selectKlasifikasi(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const kode = selectElement.value;
    this.selectedKlasifikasi.set(this.klasifikasiList().find(k => k.kode === kode) || null);
  }

  addTurunan() {
    const selected = this.selectedKlasifikasi();
    const kode = this.newTurunanKode().trim();
    const deskripsi = this.newTurunanDeskripsi().trim();
    if (selected && kode && deskripsi) {
      this.dataService.addTurunan(selected.kode, kode, deskripsi);
      this.newTurunanKode.set('');
      this.newTurunanDeskripsi.set('');
      // Refresh the selected object to show the new sub-code
      const updatedKlasifikasi = this.klasifikasiList().find(k => k.kode === selected.kode)
      this.selectedKlasifikasi.set(updatedKlasifikasi || null);
    }
  }

  deleteTurunan(kodeUtama: string, kodeTurunan: string) {
    if (confirm(`Apakah Anda yakin ingin menghapus kode turunan "${kodeTurunan}"?`)) {
        this.dataService.deleteTurunan(kodeUtama, kodeTurunan);
        // Refresh the selected object to show the updated list
        const updatedKlasifikasi = this.klasifikasiList().find(k => k.kode === kodeUtama);
        this.selectedKlasifikasi.set(updatedKlasifikasi || null);
    }
  }

  exportData() {
    const dataToExport = {
      suratList: this.dataService.suratList(),
      klasifikasiList: this.dataService.klasifikasiList()
    };
    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `penomoran-surat-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  onFileSelected(event: Event) {
      this.importError.set(null);
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = () => {
              const text = reader.result as string;
              if (confirm('Apakah Anda yakin ingin mengimpor data? Ini akan menimpa semua data yang ada saat ini di perangkat ini.')) {
                  const success = this.dataService.loadDataFromJson(text);
                  if (success) {
                      alert('Data berhasil diimpor!');
                      // to reload the dropdown
                      this.selectedKlasifikasi.set(null);
                  } else {
                      this.importError.set('Gagal mengimpor data. Pastikan file valid dan dalam format yang benar.');
                  }
              }
          };
          reader.onerror = () => {
               this.importError.set('Gagal membaca file.');
          };
          reader.readAsText(file);
          // Reset file input so the same file can be selected again
          input.value = ''; 
      }
  }

  saveScriptUrl() {
    const url = this.scriptUrlInput().trim();
    this.dataService.setGoogleScriptUrl(url || null);
    alert('URL berhasil disimpan!');
    this.testStatus.set('idle');
  }

  async testScriptUrl() {
    const url = this.scriptUrlInput().trim();
    if (!url) {
      this.testStatus.set('error');
      return;
    }

    this.testStatus.set('testing');
    
    // Create a mock test data object
    const testData = {
      id: "test-id",
      nomorLengkap: "TEST/001/HK/01/2024",
      tanggalSurat: new Date().toISOString().slice(0, 10),
      jenisNaskah: "Test",
      sifatNaskah: "Biasa",
      kodeKlasifikasi: "HK",
      perihal: "Uji Coba Koneksi",
      tujuan: "Sistem",
      isiRingkas: "Ini adalah data uji coba.",
      penandatangan: "Admin",
      staf: "Sistem",
      createdAt: Date.now()
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });
      // no-cors mode doesn't allow reading response, so we assume success if fetch doesn't throw
      this.testStatus.set('success');
    } catch (error) {
      console.error('Test connection failed', error);
      this.testStatus.set('error');
    }
  }
}
