var n=Object.defineProperty;var p=(a,e,r)=>e in a?n(a,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[e]=r;var l=(a,e,r)=>p(a,typeof e!="symbol"?e+"":e,r);import{i as m,s as i,e as v,C as h,a as x}from"./index-Ba0rJTqi.js";import{L as b}from"./letter.service-CnFNvd2E.js";var f=Object.getOwnPropertyDescriptor,g=(a,e,r,o)=>{for(var d=o>1?void 0:o?f(e,r):e,t=a.length-1,s;t>=0;t--)(s=a[t])&&(d=s(d)||d);return d};let c=class{constructor(){l(this,"letterService",m(b));l(this,"stats",this.letterService.stats);l(this,"monthlyData",i([]));l(this,"codeData",i([]));v(()=>{const a=this.stats(),e=Object.entries(a.byMonth).sort((t,s)=>t[0].localeCompare(s[0])),r=Math.max(...e.map(t=>t[1]),1);this.monthlyData.set(e.map(([t,s])=>({label:t,count:s,percent:s/r*100})));const o=Object.entries(a.byCode).sort((t,s)=>s[1]-t[1]),d=Math.max(...o.map(t=>t[1]),1);this.codeData.set(o.map(([t,s])=>({code:t,count:s,percent:s/d*100})))})}};c=g([h({selector:"app-dashboard",imports:[],template:`
    <div class="space-y-6">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-600">
          <p class="text-sm font-medium text-gray-500 uppercase">Total Surat</p>
          <p class="text-3xl font-bold mt-1">{{ stats().total }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
          <p class="text-sm font-medium text-gray-500 uppercase">TTD Ketua</p>
          <p class="text-3xl font-bold mt-1">{{ stats().ttdKetua }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-amber-600">
          <p class="text-sm font-medium text-gray-500 uppercase">TTD Kasek</p>
          <p class="text-3xl font-bold mt-1">{{ stats().ttdKasek }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Monthly Chart -->
        <div class="bg-white p-6 rounded-xl shadow-sm border">
          <h3 class="font-semibold text-gray-800 mb-4">Statistik Surat per Bulan</h3>
          <div #chartContainer class="h-64 flex items-end space-x-2">
            @for (item of monthlyData(); track item.label) {
              <div class="flex-1 flex flex-col items-center">
                <div 
                  class="w-full bg-red-500 hover:bg-red-600 rounded-t transition-all duration-500"
                  [style.height.%]="item.percent"
                ></div>
                <span class="text-[10px] mt-2 transform -rotate-45 origin-top-left">{{ item.label }}</span>
              </div>
            } @empty {
              <div class="flex-1 flex items-center justify-center text-gray-400">Belum ada data</div>
            }
          </div>
        </div>

        <!-- Code Stats -->
        <div class="bg-white p-6 rounded-xl shadow-sm border">
          <h3 class="font-semibold text-gray-800 mb-4">Statistik per Kode Klasifikasi</h3>
          <div class="space-y-4 max-h-64 overflow-y-auto pr-2">
            @for (entry of codeData(); track entry.code) {
              <div class="space-y-1">
                <div class="flex justify-between text-xs">
                  <span>{{ entry.code }}</span>
                  <span class="font-semibold">{{ entry.count }}</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                  <div class="bg-amber-500 h-2 rounded-full" [style.width.%]="entry.percent"></div>
                </div>
              </div>
            } @empty {
              <div class="text-center text-gray-400 py-8">Belum ada data</div>
            }
          </div>
        </div>
      </div>
    </div>
  `,changeDetection:x.OnPush})],c);export{c as DashboardComponent};
