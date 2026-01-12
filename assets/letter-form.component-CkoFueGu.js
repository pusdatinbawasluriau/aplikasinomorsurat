var m=Object.defineProperty;var b=(t,e,s)=>e in t?m(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>b(t,typeof e!="symbol"?e+"":e,s);import{f,i as u,s as n,C as p,a as g,g as x}from"./index-Ba0rJTqi.js";import{F as v,V as a,R as y}from"./forms-ZGhf_kEh.js";import{L as h}from"./letter.service-CnFNvd2E.js";var S=Object.getOwnPropertyDescriptor,w=(t,e,s,o)=>{for(var l=o>1?void 0:o?S(e,s):e,i=t.length-1,d;i>=0;i--)(d=t[i])&&(l=d(l)||l);return l};let c=class{constructor(){r(this,"isAdmin",f(!1));r(this,"letterService",u(h));r(this,"fb",u(v));r(this,"successMessage",n(!1));r(this,"lastNumber",n(""));r(this,"types",["Surat Edaran","Surat Tugas","Keputusan Ketua","Keputusan Sekretariat","Surat Tugas TTD Ketua","Surat Tugas TTD Sekretariat","Nota Dinas","Surat Kuasa","Surat Izin","Surat Instruksi Ketua","Surat TTD Kepala bagian","Surat TTD Kordiv"]);r(this,"signatories",["Alnofrizal","Asmin safari Lubis","rachmatul Azmi","Nur Asiah","Dandi Kurniawan","Fitri Rahmadhani"]);r(this,"staffNames",["rachmatul Azmi","Nur Asiah","Dandi Kurniawan","Fitri Rahmadhani"]);r(this,"letterForm",this.fb.group({type:["Surat Tugas",a.required],nature:["Biasa",a.required],date:[new Date().toISOString().split("T")[0],a.required],classificationCode:["PM",a.required],subCode:[""],subject:["",[a.required,a.minLength(10)]],purpose:["",[a.required,a.minLength(5)]],summary:[""],signatory:["Alnofrizal",a.required],staff:["rachmatul Azmi",a.required]}));r(this,"currentSubCodes",n([]));var e;(e=this.letterForm.get("classificationCode"))==null||e.valueChanges.subscribe(s=>{const o=this.letterService.classifications().find(l=>l.code===s);this.currentSubCodes.set((o==null?void 0:o.subCodes)||[])});const t=this.letterService.classifications().find(s=>s.code==="PM");this.currentSubCodes.set((t==null?void 0:t.subCodes)||[])}onSubmit(){if(this.letterForm.valid){const t=this.letterForm.value,e=this.letterService.saveLetter(t);this.lastNumber.set(e.letterNumber),this.successMessage.set(!0),this.letterForm.reset({type:"Surat Tugas",nature:"Biasa",date:new Date().toISOString().split("T")[0],classificationCode:"PM",subCode:"",signatory:"Alnofrizal",staff:"rachmatul Azmi"})}}};c=w([p({selector:"app-letter-form",standalone:!0,imports:[x,y],template:`
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div class="bawaslu-dark p-6 text-white text-center">
        <h2 class="text-2xl font-bold">Form Penomoran Naskah</h2>
        <p class="text-gray-400 text-sm">Bawaslu Provinsi Riau</p>
      </div>

      @if (successMessage()) {
        <div class="m-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex flex-col items-center">
          <span class="text-3xl mb-2">✅</span>
          <p class="font-bold">Nomor Berhasil Dibuat!</p>
          <p class="text-2xl font-mono mt-2 bg-white px-4 py-2 rounded shadow-sm">{{ lastNumber() }}</p>
          <button (click)="successMessage.set(false)" class="mt-4 text-sm text-green-700 underline">Buat Baru</button>
        </div>
      } @else {
        <form [formGroup]="letterForm" (ngSubmit)="onSubmit()" class="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div class="space-y-1">
            <label class="block text-sm font-semibold text-gray-700">Jenis Naskah</label>
            <select formControlName="type" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
              @for (t of types; track t) {
                <option [value]="t">{{ t }}</option>
              }
            </select>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-semibold text-gray-700">Sifat Naskah</label>
            <select formControlName="nature" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
              <option value="Biasa">Biasa</option>
              <option value="Terbatas">Terbatas</option>
              <option value="Rahasia">Rahasia</option>
            </select>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-semibold text-gray-700">Tanggal Surat</label>
            <input type="date" formControlName="date" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-semibold text-gray-700">Klasifikasi</label>
            <select formControlName="classificationCode" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
              @for (c of letterService.classifications(); track c.id) {
                <option [value]="c.code">{{ c.code }} - {{ c.name }}</option>
              }
            </select>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-semibold text-gray-700">Kode Turunan (Opsional)</label>
            <select formControlName="subCode" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
              <option value="">Tidak ada</option>
              @for (sub of currentSubCodes(); track sub) {
                <option [value]="sub">{{ sub }}</option>
              }
            </select>
          </div>

          <div class="space-y-1">
            <label class="block text-sm font-semibold text-gray-700">Penandatangan</label>
            <select formControlName="signatory" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
              @for (s of signatories; track s) {
                <option [value]="s">{{ s }}</option>
              }
            </select>
          </div>

          <div class="space-y-1 md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700">Tujuan</label>
            <input type="text" formControlName="purpose" placeholder="Minimal 5 huruf" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
            @if (letterForm.get('purpose')?.touched && letterForm.get('purpose')?.errors?.['minlength']) {
              <p class="text-xs text-red-500">Tujuan minimal 5 karakter</p>
            }
          </div>

          <div class="space-y-1 md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700">Perihal</label>
            <textarea formControlName="subject" rows="2" placeholder="Minimal 10 huruf" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"></textarea>
            @if (letterForm.get('subject')?.touched && letterForm.get('subject')?.errors?.['minlength']) {
              <p class="text-xs text-red-500">Perihal minimal 10 karakter</p>
            }
          </div>

          <div class="space-y-1 md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700">Ringkasan</label>
            <textarea formControlName="summary" rows="3" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"></textarea>
          </div>

          <div class="space-y-1 md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700">Nama Staf Pengambil</label>
            <select formControlName="staff" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition">
              @for (st of staffNames; track st) {
                <option [value]="st">{{ st }}</option>
              }
            </select>
          </div>

          <div class="md:col-span-2 mt-4">
            <button 
              type="submit" 
              [disabled]="letterForm.invalid"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Dapatkan Nomor Surat
            </button>
          </div>
        </form>
      }
    </div>
  `,changeDetection:g.OnPush})],c);export{c as LetterFormComponent};
