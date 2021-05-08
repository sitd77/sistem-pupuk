import { UserModel } from './user-model';
import firebase from 'firebase';

import { AnggotaKelompokModel } from './kelompok-tani';

export interface IPupuk {
  total: number;
  diambil: number;
}

export class DistribusiPupukModel {
  id?: string;
  anggota?: AnggotaKelompokModel;
  anggota_id: string; // id dari anggota kelompok tani
  urea_mt1: IPupuk = {
    total: 0,
    diambil: 0,
  };
  urea_mt2: IPupuk = {
    total: 0,
    diambil: 0,
  };
  urea_mt3: IPupuk = {
    total: 0,
    diambil: 0,
  };
  sp36_mt1: IPupuk = {
    total: 0,
    diambil: 0,
  };
  sp36_mt2: IPupuk = {
    total: 0,
    diambil: 0,
  };
  sp36_mt3: IPupuk = {
    total: 0,
    diambil: 0,
  };
  za_mt1: IPupuk = {
    total: 0,
    diambil: 0,
  };
  za_mt2: IPupuk = {
    total: 0,
    diambil: 0,
  };
  za_mt3: IPupuk = {
    total: 0,
    diambil: 0,
  };
  npk_mt1: IPupuk = {
    total: 0,
    diambil: 0,
  };
  npk_mt2: IPupuk = {
    total: 0,
    diambil: 0,
  };
  npk_mt3: IPupuk = {
    total: 0,
    diambil: 0,
  };
  organik_mt1: IPupuk = {
    total: 0,
    diambil: 0,
  };
  organik_mt2: IPupuk = {
    total: 0,
    diambil: 0,
  };
  organik_mt3: IPupuk = {
    total: 0,
    diambil: 0,
  };
}

export class PermohonanPupukModel {
  id?: string;
  kelompok_tani?: UserModel;
  tanggal: firebase.firestore.Timestamp = firebase.firestore.Timestamp.now();
  deskripsi: string = '';
  data: DistribusiPupukModel[] = [];
  kelompok_id: string;
}
