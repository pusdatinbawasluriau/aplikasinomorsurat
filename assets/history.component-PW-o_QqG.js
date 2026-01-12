var c=Object.defineProperty;var n=(t,e,s)=>e in t?c(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>n(t,typeof e!="symbol"?e+"":e,s);import{i as p,s as h,j as x,C as u,a as y,h as m,k as f}from"./index-BOfqQVcM.js";import{L as g}from"./letter.service-D26VPjMO.js";var v=Object.getOwnPropertyDescriptor,b=(t,e,s,o)=>{for(var a=o>1?void 0:o?v(e,s):e,l=t.length-1,i;l>=0;l--)(i=t[l])&&(a=i(a)||a);return a};let d=class{constructor(){r(this,"letterService",p(g));r(this,"searchTerm",h(""));r(this,"filteredLetters",x(()=>{const t=this.searchTerm().toLowerCase(),e=this.letterService.letters();return t?e.filter(s=>s.letterNumber.toLowerCase().includes(t)||s.subject.toLowerCase().includes(t)||s.purpose.toLowerCase().includes(t)):e}))}deleteEntry(t){confirm("Apakah Anda yakin ingin menghapus data ini?")&&this.letterService.deleteLetter(t)}};d=b([u({selector:"app-history",imports:[m,f],template:`
    <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div class="p-6 border-b flex justify-between items-center">
        <h3 class="font-bold text-lg text-gray-800">Riwayat Penomoran Naskah</h3>
        <div class="flex space-x-2">
          <input 
            type="text" 
            [(ngModel)]="searchTerm"
            placeholder="Cari perihal/nomor..." 
            class="px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
          >
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th class="px-6 py-4">Nomor Surat</th>
              <th class="px-6 py-4">Tanggal</th>
              <th class="px-6 py-4">Klasifikasi</th>
              <th class="px-6 py-4">Tujuan</th>
              <th class="px-6 py-4">Perihal</th>
              <th class="px-6 py-4">Staf</th>
              <th class="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y text-sm">
            @for (l of filteredLetters(); track l.id) {
              <tr class="hover:bg-gray-50 transition">
                <td class="px-6 py-4 font-mono font-bold text-red-700">{{ l.letterNumber }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ l.date }}</td>
                <td class="px-6 py-4">{{ l.classificationCode }}</td>
                <td class="px-6 py-4 max-w-xs truncate">{{ l.purpose }}</td>
                <td class="px-6 py-4 max-w-xs truncate">{{ l.subject }}</td>
                <td class="px-6 py-4">{{ l.staff }}</td>
                <td class="px-6 py-4">
                  <button (click)="deleteEntry(l.id)" class="text-red-600 hover:text-red-800 font-medium">Hapus</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="7" class="px-6 py-12 text-center text-gray-400">Belum ada data riwayat penomoran.</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,changeDetection:y.OnPush})],d);export{d as HistoryComponent};
