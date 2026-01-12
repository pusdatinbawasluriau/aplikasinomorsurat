import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class HistoryComponent implements OnInit {
  dataService = inject(DataService);

  filterKlasifikasi = signal('');
  searchTerm = signal('');

  klasifikasiOptions = computed(() => {
    return this.dataService.klasifikasiList().map(k => k.kode);
  });
  
  filteredHistoryData = computed(() => {
    const filterKode = this.filterKlasifikasi();
    const search = this.searchTerm().toLowerCase();

    let filtered = this.dataService.suratList();

    if (filterKode) {
      filtered = filtered.filter(s => s.kodeKlasifikasi === filterKode);
    }

    if (search) {
      filtered = filtered.filter(s => s.nomorLengkap.toLowerCase().includes(search));
    }

    return filtered.map(surat => ({
      id: surat.id,
      nomor: surat.nomorLengkap,
      tanggal: surat.tanggalSurat,
      klasifikasi: surat.kodeTurunan ? `${surat.kodeKlasifikasi}.${surat.kodeTurunan}` : surat.kodeKlasifikasi,
      tujuan: surat.tujuan,
      perihal: surat.perihal,
      staf: `${surat.penandatangan} (Staf: ${surat.staf})`
    }));
  });

  ngOnInit(): void {
    this.dataService.loadFromStorage();
  }

  deleteSurat(id: string) {
    if (confirm('Apakah Anda yakin ingin menghapus surat ini? Riwayat tidak dapat dipulihkan.')) {
      this.dataService.deleteSurat(id);
    }
  }

  onFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterKlasifikasi.set(selectElement.value);
  }

  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm.set(inputElement.value);
  }

  downloadCSV() {
    const data = this.filteredHistoryData();
    if (data.length === 0) {
      alert('Tidak ada data untuk diunduh.');
      return;
    }

    const headers = ['Nomor', 'Tanggal', 'Klasifikasi', 'Tujuan', 'Perihal', 'Staf/Penandatangan'];
    
    const escapeCsvCell = (cell: string) => {
      if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
        return `"${cell.replace(/"/g, '""')}"`;
      }
      return cell;
    };

    const csvRows = [
      headers.join(','),
      ...data.map(row => [
        escapeCsvCell(row.nomor),
        escapeCsvCell(row.tanggal),
        escapeCsvCell(row.klasifikasi),
        escapeCsvCell(row.tujuan),
        escapeCsvCell(row.perihal),
        escapeCsvCell(row.staf)
      ].join(','))
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `riwayat-naskah-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}