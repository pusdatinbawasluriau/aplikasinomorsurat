import{LetterFormComponent as l}from"./letter-form.component-CkoFueGu.js";import{C as m,a as p,R as c}from"./index-Ba0rJTqi.js";import"./forms-ZGhf_kEh.js";import"./letter.service-CnFNvd2E.js";var x=Object.getOwnPropertyDescriptor,d=(a,r,i,s)=>{for(var t=s>1?void 0:s?x(r,i):r,e=a.length-1,o;e>=0;e--)(o=a[e])&&(t=o(t)||t);return t};let n=class{};n=d([m({selector:"app-user-form",imports:[l,c],template:`
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <div class="flex items-center space-x-3">
          <img src="https://riau.bawaslu.go.id/wp-content/uploads/2021/08/logo-bawaslu.png" alt="Logo" class="h-8">
          <span class="font-bold text-gray-800 tracking-tight text-sm md:text-base">E-PENOMORAN RIAU</span>
        </div>
        <a routerLink="/login" class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-red-600 border border-gray-200 rounded-lg hover:border-red-200 transition">
          Admin Login
        </a>
      </nav>

      <div class="py-12 px-4">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">Penomoran Naskah Dinas</h1>
          <p class="mt-3 max-w-2xl mx-auto text-gray-500">Silakan isi formulir di bawah ini untuk mendapatkan nomor surat secara otomatis.</p>
        </div>
        
        <app-letter-form [isAdmin]="false"></app-letter-form>

        <footer class="mt-20 text-center text-gray-400 text-xs py-8">
          &copy; 2026 Bawaslu Provinsi Riau. Dipersembahkan oleh Bagian Administrasi.
        </footer>
      </div>
    </div>
  `,changeDetection:p.OnPush})],n);export{n as UserFormComponent};
