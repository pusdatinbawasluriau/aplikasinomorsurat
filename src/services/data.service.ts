
import { Injectable, signal } from '@angular/core';
import { Classification, Letter } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private STORAGE_KEY_LETTERS = 'bawaslu_letters';
  private STORAGE_KEY_CONFIG = 'bawaslu_config';

  letters = signal<Letter[]>(this.loadLetters());
  classifications = signal<Classification[]>(this.loadConfig());

  constructor() {
    if (this.classifications().length === 0) {
      this.initDefaultConfig();
    }
  }

  private loadLetters(): Letter[] {
    const data = localStorage.getItem(this.STORAGE_KEY_LETTERS);
    return data ? JSON.parse(data) : [];
  }

  private loadConfig(): Classification[] {
    const data = localStorage.getItem(this.STORAGE_KEY_CONFIG);
    return data ? JSON.parse(data) : [];
  }

  private saveLetters() {
    localStorage.setItem(this.STORAGE_KEY_LETTERS, JSON.stringify(this.letters()));
  }

  private saveConfig() {
    localStorage.setItem(this.STORAGE_KEY_CONFIG, JSON.stringify(this.classifications()));
  }

  private initDefaultConfig() {
    const defaults: Classification[] = [
      { id: '1', code: 'PM', name: 'Pengawasan Pemilu', subCodes: [{ id: '1-1', code: '00', name: 'Umum' }] },
      { id: '2', code: 'PP', name: 'Penanganan Pelanggaran', subCodes: [] },
      { id: '3', code: 'PS', name: 'Penyelesaian Sengketa', subCodes: [] },
      { id: '4', code: 'PR', name: 'Perencanaan', subCodes: [] },
      { id: '5', code: 'OT', name: 'Organisasi dan Tata Laksana', subCodes: [] },
      { id: '6', code: 'KA', name: 'Persuratan dan Kearsipan', subCodes: [] },
      { id: '7', code: 'KU', name: 'Keuangan', subCodes: [] },
      { id: '8', code: 'PL', name: 'Perlengkapan', subCodes: [] },
      { id: '9', code: 'HK', name: 'Hukum', subCodes: [] },
      { id: '10', code: 'HM', name: 'Hubungan Masyarakat', subCodes: [] },
      { id: '11', code: 'KP', name: 'Kepegawaian', subCodes: [] },
      { id: '12', code: 'RT', name: 'Ketatausahaan', subCodes: [] },
      { id: '13', code: 'TI', name: 'Teknologi Informasi', subCodes: [] }
    ];
    this.classifications.set(defaults);
    this.saveConfig();
  }

  generateLetterNumber(data: any): string {
    const { date, classificationCode, subCode, signatory } = data;
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    
    // Convert month to Roman numerals for formal feel, or standard number as requested
    const monthStr = month.toString(); 

    const sameCodeLetters = this.letters().filter(l => l.classificationCode === classificationCode);
    const sameDateLetters = sameCodeLetters.filter(l => l.date === date);

    let sequence = 1;
    let suffix = 1;

    if (sameDateLetters.length > 0) {
      // Find max suffix for this date
      const maxSuffix = Math.max(...sameDateLetters.map(l => l.suffix || 1));
      suffix = maxSuffix + 1;
      sequence = sameDateLetters[0].sequence;
    } else {
      // It's a new date for this code.
      // We need to determine if it's "backdated" or new.
      // For simplicity in this logic: find global sequence for this code
      const maxGlobalSeq = sameCodeLetters.length > 0 ? Math.max(...sameCodeLetters.map(l => l.sequence)) : 0;
      sequence = maxGlobalSeq + 1;
    }

    const sequenceStr = suffix > 1 ? `${sequence}.${suffix}` : `${sequence}`;
    const raCode = signatory.includes('Alnofrizal') ? 'K.RA' : 'RA';
    const subCodeStr = subCode ? `.${subCode}` : '';
    
    return `${sequenceStr}/${classificationCode}${subCodeStr}/${raCode}/${monthStr}/${year}`;
  }

  addLetter(letterData: Omit<Letter, 'id' | 'fullNumber' | 'createdAt' | 'sequence' | 'suffix'>) {
    const fullNumber = this.generateLetterNumber(letterData);
    
    // Calculate sequence and suffix for storage
    const dateObj = new Date(letterData.date);
    const sameCodeLetters = this.letters().filter(l => l.classificationCode === letterData.classificationCode);
    const sameDateLetters = sameCodeLetters.filter(l => l.date === letterData.date);
    
    let seq = 1;
    let suf = 1;
    if (sameDateLetters.length > 0) {
      suf = Math.max(...sameDateLetters.map(l => l.suffix || 1)) + 1;
      seq = sameDateLetters[0].sequence;
    } else {
      seq = sameCodeLetters.length > 0 ? Math.max(...sameCodeLetters.map(l => l.sequence)) + 1 : 1;
    }

    const newLetter: Letter = {
      ...letterData,
      id: Math.random().toString(36).substr(2, 9),
      fullNumber,
      sequence: seq,
      suffix: suf,
      createdAt: Date.now()
    };

    this.letters.update(prev => [newLetter, ...prev]);
    this.saveLetters();
    return newLetter;
  }

  deleteLetter(id: string) {
    this.letters.update(prev => prev.filter(l => l.id !== id));
    this.saveLetters();
  }

  addClassification(code: string, name: string) {
    const newClass: Classification = {
      id: Math.random().toString(36).substr(2, 9),
      code,
      name,
      subCodes: []
    };
    this.classifications.update(prev => [...prev, newClass]);
    this.saveConfig();
  }

  addSubCode(classId: string, code: string, name: string) {
    this.classifications.update(prev => prev.map(c => {
      if (c.id === classId) {
        return {
          ...c,
          subCodes: [...c.subCodes, { id: Math.random().toString(36).substr(2, 9), code, name }]
        };
      }
      return c;
    }));
    this.saveConfig();
  }
}
