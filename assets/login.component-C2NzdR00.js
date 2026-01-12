var u=Object.defineProperty;var c=(t,e,r)=>e in t?u(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var s=(t,e,r)=>c(t,typeof e!="symbol"?e+"":e,r);import{i,b as g,s as p,C as b,a as x}from"./index-Ba0rJTqi.js";import{F as f,V as d,R as v}from"./forms-ZGhf_kEh.js";var w=Object.getOwnPropertyDescriptor,h=(t,e,r,n)=>{for(var a=n>1?void 0:n?w(e,r):e,o=t.length-1,l;o>=0;o--)(l=t[o])&&(a=l(a)||a);return a};let m=class{constructor(){s(this,"fb",i(f));s(this,"router",i(g));s(this,"error",p(!1));s(this,"loginForm",this.fb.group({username:["",d.required],password:["",d.required]}))}onLogin(){const{username:t,password:e}=this.loginForm.value;t==="admin"&&e==="bawaslu2026"?(sessionStorage.setItem("admin_token","true"),this.router.navigate(["/admin"])):this.error.set(!0)}};m=h([b({selector:"app-login",imports:[v],template:`
    <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div class="text-center mb-8">
          <img src="https://riau.bawaslu.go.id/wp-content/uploads/2021/08/logo-bawaslu.png" alt="Logo" class="h-16 mx-auto mb-4">
          <h1 class="text-xl font-bold text-gray-800">Login Administrator</h1>
          <p class="text-gray-500 text-sm">E-Penomoran Bawaslu Provinsi Riau</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="space-y-6">
          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-600">Username</label>
            <input type="text" formControlName="username" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none transition">
          </div>

          <div class="space-y-1">
            <label class="text-sm font-semibold text-gray-600">Password</label>
            <input type="password" formControlName="password" class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none transition">
          </div>

          @if (error()) {
            <p class="text-red-500 text-xs text-center">Username atau Password salah!</p>
          }

          <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-lg transition transform active:scale-95">
            Masuk ke Panel
          </button>
        </form>

        <div class="mt-6 text-center">
          <a href="#/" class="text-sm text-gray-500 hover:text-red-600 underline">Kembali ke Halaman Publik</a>
        </div>
      </div>
    </div>
  `,changeDetection:x.OnPush})],m);export{m as LoginComponent};
