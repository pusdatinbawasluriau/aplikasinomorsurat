
export interface Classification {
  id: string;
  code: string;
  name: string;
  subCodes: SubCode[];
}

export interface SubCode {
  id: string;
  code: string;
  name: string;
}

export interface Letter {
  id: string;
  fullNumber: string;
  sequence: number;
  suffix: number;
  type: string;
  priority: string;
  date: string;
  classificationCode: string;
  subCode?: string;
  subject: string;
  destination: string;
  summary: string;
  signatory: string;
  staff: string;
  createdAt: number;
}

export type SignatoryType = 'Ketua' | 'Kepala Sekretariat' | 'Kepala Bagian' | 'Kordiv';
