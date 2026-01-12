var r=Object.defineProperty;var c=(e,s,t)=>s in e?r(e,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[s]=t;var a=(e,s,t)=>c(e,typeof s!="symbol"?s+"":s,t);import{i as p,s as u,C as b,a as m}from"./index-Ba0rJTqi.js";import{L as v}from"./letter.service-CnFNvd2E.js";import{a as g}from"./forms-ZGhf_kEh.js";var x=Object.getOwnPropertyDescriptor,f=(e,s,t,d)=>{for(var i=d>1?void 0:d?x(s,t):s,l=e.length-1,n;l>=0;l--)(n=e[l])&&(i=n(i)||i);return i};let o=class{constructor(){a(this,"letterService",p(v));a(this,"newCode","");a(this,"newName","");a(this,"newSubCode","");a(this,"selectedClass",u(null))}getActiveClass(){return this.letterService.classifications().find(e=>e.id===this.selectedClass())}addCode(){this.newCode&&this.newName&&(this.letterService.addClassification(this.newCode,this.newName),this.newCode="",this.newName="")}addSub(){const e=this.selectedClass();e&&this.newSubCode&&(this.letterService.addSubCode(e,this.newSubCode),this.newSubCode="")}};o=f([b({selector:"app-settings",imports:[g],template:`
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Classification Management -->
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <h3 class="font-bold text-lg text-gray-800 mb-6 flex items-center">
          <span class="mr-2">📂</span> Kode Klasifikasi
        </h3>
        
        <div class="space-y-4 mb-6">
          <div class="flex space-x-2">
            <input [(ngModel)]="newCode" placeholder="Kode (misal: PM)" class="flex-1 px-4 py-2 border rounded-lg outline-none">
            <input [(ngModel)]="newName" placeholder="Nama Klasifikasi" class="flex-[2] px-4 py-2 border rounded-lg outline-none">
            <button (click)="addCode()" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Tambah</button>
          </div>
        </div>

        <div class="space-y-2 max-h-96 overflow-y-auto pr-2">
          @for (c of letterService.classifications(); track c.id) {
            <div 
              (click)="selectedClass.set(c.id)"
              class="p-4 border rounded-lg cursor-pointer hover:border-red-300 transition"
              [class.border-red-600]="selectedClass() === c.id"
              [class.bg-red-50]="selectedClass() === c.id"
            >
              <p class="font-bold text-sm">{{ c.code }}</p>
              <p class="text-xs text-gray-500">{{ c.name }}</p>
            </div>
          }
        </div>
      </div>

      <!-- Subcode Management -->
      <div class="bg-white p-6 rounded-xl shadow-sm border">
        <h3 class="font-bold text-lg text-gray-800 mb-6 flex items-center">
          <span class="mr-2">🌿</span> Kode Turunan
        </h3>

        @if (selectedClass()) {
          @let activeClass = getActiveClass();
          <div class="mb-4">
            <p class="text-sm font-medium mb-1">Klasifikasi: <span class="text-red-600">{{ activeClass?.code }}</span></p>
            <div class="flex space-x-2 mt-2">
              <input [(ngModel)]="newSubCode" placeholder="Kode Turunan (misal: 01.00)" class="flex-1 px-4 py-2 border rounded-lg outline-none">
              <button (click)="addSub()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Tambah</button>
            </div>
          </div>

          <div class="space-y-2">
            @for (sub of activeClass?.subCodes; track sub) {
              <div class="px-4 py-2 bg-gray-50 rounded-lg text-sm flex justify-between">
                <span>{{ sub }}</span>
                <span class="text-xs text-gray-400">Aktif</span>
              </div>
            } @empty {
              <p class="text-center py-8 text-gray-400 italic">Belum ada kode turunan.</p>
            }
          </div>
        } @else {
          <div class="flex flex-col items-center justify-center h-full py-12 text-gray-400">
            <span>👈 Pilih klasifikasi di sebelah kiri</span>
          </div>
        }
      </div>
    </div>
  `,changeDetection:m.OnPush})],o);export{o as SettingsComponent};
