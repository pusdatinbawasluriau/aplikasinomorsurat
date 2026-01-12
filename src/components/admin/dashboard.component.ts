
import { Component, inject, signal, computed, effect, ElementRef, viewChild, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8">
      <!-- Welcome Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Statistik</h1>
          <p class="text-slate-500 mt-1">Ringkasan data penomoran surat Bawaslu Provinsi Riau.</p>
        </div>
        <div class="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
          <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-slate-700">Sistem Aktif</span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500">Total Surat</p>
              <h3 class="text-2xl font-bold text-slate-900">{{ totalLetters() }}</h3>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-orange-100 text-orange-600 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500">TTD Ketua</p>
              <h3 class="text-2xl font-bold text-slate-900">{{ ttdKetua() }}</h3>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500">TTD Kasek</p>
              <h3 class="text-2xl font-bold text-slate-900">{{ ttdKasek() }}</h3>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-green-100 text-green-600 rounded-xl">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
            </div>
            <div>
              <p class="text-sm font-medium text-slate-500">Klasifikasi</p>
              <h3 class="text-2xl font-bold text-slate-900">{{ totalCodes() }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Monthly Stats Chart -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div class="flex items-center justify-between mb-6">
            <h4 class="text-lg font-bold text-slate-800">Statistik Per Bulan</h4>
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Trend 2024</span>
          </div>
          <div #monthlyChart class="chart-container min-h-[350px]"></div>
        </div>

        <!-- Code Stats Chart -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div class="flex items-center justify-between mb-6">
            <h4 class="text-lg font-bold text-slate-800">Statistik Per Kode</h4>
            <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Distribusi</span>
          </div>
          <div #codeChart class="chart-container min-h-[350px]"></div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  private dataService = inject(DataService);
  
  monthlyChartEl = viewChild<ElementRef>('monthlyChart');
  codeChartEl = viewChild<ElementRef>('codeChart');

  totalLetters = computed(() => this.dataService.letters().length);
  ttdKetua = computed(() => this.dataService.letters().filter(l => l.signatory.includes('Alnofrizal')).length);
  ttdKasek = computed(() => this.dataService.letters().filter(l => l.signatory.includes('Asmin Safari')).length);
  totalCodes = computed(() => this.dataService.classifications().length);

  constructor() {
    effect(() => {
      this.updateCharts();
    });
  }

  updateCharts() {
    const letters = this.dataService.letters();
    const monthlyEl = this.monthlyChartEl();
    const codeEl = this.codeChartEl();
    if (monthlyEl) this.drawMonthlyChart(letters);
    if (codeEl) this.drawCodeChart(letters);
  }

  drawMonthlyChart(letters: any[]) {
    const el = this.monthlyChartEl()?.nativeElement;
    if (!el) return;
    d3.select(el).selectAll('*').remove();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const data = months.map((m, i) => ({
      month: m,
      count: letters.filter(l => new Date(l.date).getMonth() === i).length
    }));

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = el.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3.select(el).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().range([0, width]).domain(months).padding(0.2);
    const y = d3.scaleLinear().range([height, 0]).domain([0, d3.max(data, d => d.count) || 10]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr('class', 'text-slate-400 text-xs');

    svg.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .attr('class', 'text-slate-400 text-xs');

    svg.selectAll('.bar').data(data).enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.month) || 0)
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.count))
      .attr('height', d => height - y(d.count))
      .attr('fill', '#f97316')
      .attr('rx', 4);
  }

  drawCodeChart(letters: any[]) {
    const el = this.codeChartEl()?.nativeElement;
    if (!el) return;
    d3.select(el).selectAll('*').remove();

    const counts = d3.rollups(letters, v => v.length, (d: any) => d.classificationCode);
    const data = counts.map(([code, count]) => ({ code, count })).slice(0, 10);

    if (data.length === 0) return;

    const width = el.clientWidth;
    const height = 350;
    const radius = Math.min(width, height) / 3;

    const svg = d3.select(el).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const pie = d3.pie<any>().value(d => d.count);
    const arc = d3.arc<any>().innerRadius(60).outerRadius(radius);

    svg.selectAll('path').data(pie(data)).enter().append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i.toString()))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');
      
    const legend = svg.selectAll('.legend').data(data).enter().append('g')
      .attr('transform', (d, i) => `translate(-60, ${radius + 20 + (i * 18)})`);
    
    legend.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', (d, i) => color(i.toString()));

    legend.append('text')
      .attr('x', 15)
      .attr('y', 10)
      .text(d => `${d.code} (${d.count})`)
      .attr('class', 'text-[10px] font-medium text-slate-600');
  }
}
