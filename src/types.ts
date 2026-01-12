export interface Surat {
  id: string;
  nomorLengkap: string;
  nomorUrut: number;
  subNomor: number;
  jenisNaskah: string;
  sifatNaskah: string;
  tanggalSurat: string; // YYYY-MM-DD
  kodeKlasifikasi: string;
  kodeTurunan?: string;
  perihal: string;
  tujuan: string;
  isiRingkas: string;
  penandatangan: string;
  staf: string;
  createdAt: number;
}

export interface Klasifikasi {
  kode: string;
  deskripsi: string;
  turunan: { kode: string; deskripsi: string; }[];
}
