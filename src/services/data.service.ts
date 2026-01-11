import { Injectable, signal, OnDestroy } from '@angular/core';
import { Klasifikasi, Surat } from '../types';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  private readonly SURAT_KEY = 'surat_data';
  private readonly KLASIFIKASI_KEY = 'klasifikasi_data';
  private readonly SCRIPT_URL_KEY = 'google_script_url';

  suratList = signal<Surat[]>([]);
  klasifikasiList = signal<Klasifikasi[]>([]);
  googleScriptUrl = signal<string | null>(null);

  constructor() {
    this.loadFromStorage();
    window.addEventListener('storage', this.handleStorageChange);
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.handleStorageChange);
  }

  private handleStorageChange = (event: StorageEvent): void => {
    if (event.key === this.SURAT_KEY || event.key === this.KLASIFIKASI_KEY || event.key === this.SCRIPT_URL_KEY) {
      this.loadFromStorage();
    }
  };

  private persistData() {
    localStorage.setItem(this.SURAT_KEY, JSON.stringify(this.suratList()));
    localStorage.setItem(this.KLASIFIKASI_KEY, JSON.stringify(this.klasifikasiList()));
  }

  public setGoogleScriptUrl(url: string | null) {
    if (url) {
      localStorage.setItem(this.SCRIPT_URL_KEY, url);
      this.googleScriptUrl.set(url);
    } else {
      localStorage.removeItem(this.SCRIPT_URL_KEY);
      this.googleScriptUrl.set(null);
    }
  }

  private sanitizeKlasifikasi(data: any[]): Klasifikasi[] {
    return data.map(k => ({
      kode: k.kode || 'UNKNOWN',
      deskripsi: k.deskripsi || 'No Description',
      turunan: Array.isArray(k.turunan) ? k.turunan : []
    }));
  }

  public loadFromStorage() {
    // Load Surat Data
    const storedSurat = localStorage.getItem(this.SURAT_KEY);
    if (storedSurat) {
      try {
        const parsedSurat = JSON.parse(storedSurat);
        this.suratList.set(Array.isArray(parsedSurat) ? parsedSurat : []);
      } catch (e) {
        console.error('Gagal memuat data surat dari localStorage, data direset:', e);
        this.suratList.set([]);
      }
    }

    // Load Klasifikasi Data
    const storedKlasifikasi = localStorage.getItem(this.KLASIFIKASI_KEY);
    if (storedKlasifikasi) {
      try {
        const parsedKlasifikasi = JSON.parse(storedKlasifikasi);
        if (Array.isArray(parsedKlasifikasi) && parsedKlasifikasi.length > 0) {
          this.klasifikasiList.set(this.sanitizeKlasifikasi(parsedKlasifikasi));
        } else {
          this.klasifikasiList.set(this.getDefaultKlasifikasi());
        }
      } catch (e) {
        console.error('Gagal memuat data klasifikasi dari localStorage, data direset ke default:', e);
        this.klasifikasiList.set(this.getDefaultKlasifikasi());
      }
    } else {
      this.klasifikasiList.set(this.getDefaultKlasifikasi());
    }

    // Load Google Script URL
    const storedScriptUrl = localStorage.getItem(this.SCRIPT_URL_KEY);
    if (storedScriptUrl) {
      this.googleScriptUrl.set(storedScriptUrl);
    }
  }

  public loadDataFromJson(jsonContent: string): boolean {
    try {
        const data = JSON.parse(jsonContent);
        // Basic validation for structure
        if (data && Array.isArray(data.suratList) && Array.isArray(data.klasifikasiList)) {
            this.suratList.set(data.suratList);
            this.klasifikasiList.set(this.sanitizeKlasifikasi(data.klasifikasiList));
            this.persistData();
            return true;
        }
        return false;
    } catch (e) {
        console.error("Error parsing imported JSON", e);
        return false;
    }
  }

  addSurat(suratInput: Omit<Surat, 'id' | 'nomorLengkap' | 'nomorUrut' | 'subNomor' | 'createdAt'>): Surat {
    const allSurat = this.suratList();
    const suratForCode = allSurat.filter(s => s.kodeKlasifikasi === suratInput.kodeKlasifikasi);
    
    // Check for same date, same code
    const suratOnSameDate = suratForCode.filter(s => s.tanggalSurat === suratInput.tanggalSurat);

    let newNomorUrut: number;
    let newSubNomor: number = 1;

    if (suratOnSameDate.length > 0) {
        // Use the same nomorUrut but increment subNomor
        newNomorUrut = suratOnSameDate[0].nomorUrut;
        newSubNomor = Math.max(...suratOnSameDate.map(s => s.subNomor)) + 1;
    } else {
        // Get the highest nomorUrut for this code and increment
        newNomorUrut = suratForCode.length > 0 ? Math.max(...suratForCode.map(s => s.nomorUrut)) + 1 : 1;
    }

    const date = new Date(suratInput.tanggalSurat);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    const penandatanganCode = suratInput.penandatangan === 'Alnofrizal' ? 'K.RA' : 'RA';
    
    const nomorUrutFormatted = String(newNomorUrut).padStart(3, '0');
    const nomorDisplay = `${nomorUrutFormatted}.${newSubNomor}`;
    
    const kodeLengkap = suratInput.kodeTurunan
      ? `${suratInput.kodeKlasifikasi}.${suratInput.kodeTurunan}`
      : suratInput.kodeKlasifikasi;
      
    const nomorLengkap = `${nomorDisplay}/${kodeLengkap}/${penandatanganCode}/${month}/${year}`;

    const newSurat: Surat = {
      ...suratInput,
      id: crypto.randomUUID(),
      nomorLengkap: nomorLengkap,
      nomorUrut: newNomorUrut,
      subNomor: newSubNomor,
      createdAt: Date.now()
    };

    this.suratList.update(list => [...list, newSurat].sort((a, b) => b.createdAt - a.createdAt));
    this.persistData();
    this.syncToGoogleSheet(newSurat);
    return newSurat;
  }

  private async syncToGoogleSheet(surat: Surat) {
    const url = this.googleScriptUrl();
    if (!url) {
      return;
    }

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors', // Important for Apps Script web apps to avoid CORS issues
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surat)
      });
    } catch (error) {
      console.error('Gagal sinkronisasi ke Google Sheet:', error);
      // We don't throw an error to the user, as the primary function (numbering) succeeded.
      // We just log it for debugging.
    }
  }

  deleteSurat(id: string) {
    this.suratList.update(list => list.filter(surat => surat.id !== id));
    this.persistData();
  }

  addKlasifikasi(kode: string, deskripsi: string) {
    this.klasifikasiList.update(list => [...list, { kode, deskripsi, turunan: [] }]);
    this.persistData();
  }

  addTurunan(kodeUtama: string, kode: string, deskripsi: string) {
    this.klasifikasiList.update(list => {
      const klasifikasi = list.find(k => k.kode === kodeUtama);
      if (klasifikasi) {
        klasifikasi.turunan.push({ kode, deskripsi });
      }
      return [...list];
    });
    this.persistData();
  }

  deleteTurunan(kodeUtama: string, kodeTurunan: string) {
    this.klasifikasiList.update(list => {
        const klasifikasi = list.find(k => k.kode === kodeUtama);
        if (klasifikasi) {
            klasifikasi.turunan = klasifikasi.turunan.filter(t => t.kode !== kodeTurunan);
        }
        return [...list];
    });
    this.persistData();
  }

  private getDefaultKlasifikasi(): Klasifikasi[] {
    return [
      { 
        kode: 'PM', 
        deskripsi: 'Pengawasan Pemilu', 
        turunan: [
          { kode: '01.01', deskripsi: 'Pengawasan Tahapan' },
          { kode: '01.02', deskripsi: 'Pengawasan Dana Kampanye' }
        ] 
      },
      { kode: 'PP', deskripsi: 'PENANGANAN PELANGGARAN DAN SENGKETA PEMILU', turunan: [] },
      { kode: 'PS', deskripsi: 'PENYELESAIAN SENGKETA', turunan: [] },
      { kode: 'PR', deskripsi: 'PERENCANAAN', turunan: [] },
      { kode: 'OT', deskripsi: 'ORGANISASI DAN TATA LAKSANA', turunan: [] },
      { kode: 'KA', deskripsi: 'PERSURATAN DAN KEARSIPAN', turunan: [] },
      { kode: 'KU', deskripsi: 'KEUANGAN', turunan: [] },
      { kode: 'PL', deskripsi: 'PERLENGKAPAN', turunan: [] },
      { 
        kode: 'HK', 
        deskripsi: 'HUKUM', 
        turunan: [
          { kode: '01.00', deskripsi: 'Produk Hukum' },
          { kode: '02.00', deskripsi: 'Bantuan Hukum' }
        ] 
      },
      { kode: 'HM', deskripsi: 'HUBUNGAN MASYARAKAT', turunan: [] },
      { 
        kode: 'KP', 
        deskripsi: 'KEPEGAWAIAN', 
        turunan: [
            { kode: '01.00', deskripsi: 'Formasi' },
            { kode: '02.00', deskripsi: 'Pengadaan Pegawai' },
            { kode: '03.00', deskripsi: 'Kenaikan Pangkat' }
        ] 
      },
      { kode: 'RT', deskripsi: 'KETATAUSAHAAN DAN KERUMAHTANGGAAN', turunan: [] },
      { kode: 'TI', deskripsi: 'TEKNOLOGI INFORMASI', turunan: [] }
    ];
  }
}