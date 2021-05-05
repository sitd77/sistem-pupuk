import { UserModel } from './user-model';

export enum AnggotaRole {
  ANGGOTA = 1,
  BENDAHARA = 2,
  SEKRETARIS = 3,
  KETUA = 4,
}
// anggota kelompok tani
export class AnggotaKelompokModel {
  id?: string;
  kelompok_id: string;
  kelompok_tani?: UserModel; // dengan role = 1 atau KELOMPOK_TANI
  nama: string;
  nik: string;
  alamat: string;
  luas_lahan: number;
  role: AnggotaRole = AnggotaRole.ANGGOTA;
}
