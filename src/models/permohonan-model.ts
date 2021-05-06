import { UserModel } from './user-model';
import firebase from 'firebase';

import { AnggotaKelompokModel } from './kelompok-tani';

export interface IPupuk {
  nilai: number;
  diambil: boolean;
}

export class DistribusiPupukModel {
  id?: string;
  anggota?: AnggotaKelompokModel;
  anggota_id: string; // id dari anggota kelompok tani
  urea_mt1: IPupuk;
  urea_mt2: IPupuk;
  urea_mt3: IPupuk;
  sp36_mt1: IPupuk;
  sp36_mt2: IPupuk;
  sp36_mt3: IPupuk;
  za_mt1: IPupuk;
  za_mt2: IPupuk;
  za_mt3: IPupuk;
  npk_mt1: IPupuk;
  npk_mt2: IPupuk;
  npk_mt3: IPupuk;
  organik_mt1: IPupuk;
  organik_mt2: IPupuk;
  organik_mt3: IPupuk;
}

export class PermohonanPupukModel {
  id?: string;
  kelompok_tani?: UserModel;
  tanggal: firebase.firestore.Timestamp = firebase.firestore.Timestamp.now();
  deskripsi: string = '';
  data: DistribusiPupukModel[] = [];
  kelompok_id: string;
}
