var c=Object.defineProperty;var d=(t,e,s)=>e in t?c(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var i=(t,e,s)=>d(t,typeof e!="symbol"?e+"":e,s);import{i as p,b as u,C as g,a as m,c as x,R as b,d as v}from"./index-Ba0rJTqi.js";var f=Object.getOwnPropertyDescriptor,h=(t,e,s,n)=>{for(var r=n>1?void 0:n?f(e,s):e,a=t.length-1,o;a>=0;a--)(o=t[a])&&(r=o(r)||r);return r};let l=class{constructor(){i(this,"router",p(u))}logout(){sessionStorage.removeItem("admin_token"),this.router.navigate(["/login"])}};l=h([g({selector:"app-admin-layout",imports:[x,b,v],template:`
    <div class="min-h-screen flex">
      <!-- Sidebar -->
      <aside class="w-64 bawaslu-dark text-white flex flex-col hidden md:flex">
        <div class="p-6 border-b border-gray-700 flex flex-col items-center">
          <img src="https://riau.bawaslu.go.id/wp-content/uploads/2021/08/logo-bawaslu.png" alt="Logo" class="h-12 mb-2">
          <h1 class="text-sm font-bold tracking-widest text-center">BAWASLU PROVINSI RIAU</h1>
        </div>
        
        <nav class="flex-1 px-4 py-6 space-y-2">
          <a routerLink="dashboard" routerLinkActive="bg-red-700" class="flex items-center px-4 py-3 rounded-lg hover:bg-red-800 transition">
            <span class="mr-3">📊</span> Dashboard
          </a>
          <a routerLink="input" routerLinkActive="bg-red-700" class="flex items-center px-4 py-3 rounded-lg hover:bg-red-800 transition">
            <span class="mr-3">📝</span> Input Penomoran
          </a>
          <a routerLink="history" routerLinkActive="bg-red-700" class="flex items-center px-4 py-3 rounded-lg hover:bg-red-800 transition">
            <span class="mr-3">📜</span> Riwayat Naskah
          </a>
          <a routerLink="settings" routerLinkActive="bg-red-700" class="flex items-center px-4 py-3 rounded-lg hover:bg-red-800 transition">
            <span class="mr-3">⚙️</span> Pengaturan
          </a>
        </nav>

        <div class="p-4 border-t border-gray-700">
          <button (click)="logout()" class="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 text-red-400 transition">
            <span class="mr-3">🚪</span> Keluar
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-50 flex flex-col h-screen overflow-y-auto">
        <header class="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 class="text-xl font-semibold text-gray-800">Panel Administrasi</h2>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500 font-medium">Administrator</span>
            <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs">AD</div>
          </div>
        </header>

        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,changeDetection:m.OnPush})],l);export{l as AdminLayoutComponent};
