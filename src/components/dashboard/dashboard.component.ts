import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class DashboardComponent {
  dataService = inject(DataService);

  totalSurat = computed(() => this.dataService.suratList().length);
  ttdKasek = computed(() => this.dataService.suratList().filter(s => s.penandatangan === 'Asmin safari Lubis').length);
  ttdKetua = computed(() => this.dataService.suratList().filter(s => s.penandatangan === 'Alnofrizal').length);

  statsPerBulan = computed(() => {
    const counts: { [key: string]: number } = {};
    this.dataService.suratList().forEach(surat => {
      const monthYear = new Date(surat.tanggalSurat).toLocaleString('id-ID', { month: 'long', year: 'numeric' });
      counts[monthYear] = (counts[monthYear] || 0) + 1;
    });
    return Object.entries(counts).map(([label, value]) => ({ label, value })).sort((a,b) => new Date(b.label).getTime() - new Date(a.label).getTime());
  });

  statsPerKode = computed(() => {
    const counts: { [key: string]: number } = {};
    this.dataService.suratList().forEach(surat => {
      counts[surat.kodeKlasifikasi] = (counts[surat.kodeKlasifikasi] || 0) + 1;
    });
     return Object.entries(counts).map(([label, value]) => ({ label, value })).sort((a,b) => b.value - a.value);
  });
  
  maxStatPerBulan = computed(() => Math.max(1, ...this.statsPerBulan().map(s => s.value)));
  maxStatPerKode = computed(() => Math.max(1, ...this.statsPerKode().map(s => s.value)));
}
