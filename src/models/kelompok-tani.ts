import { UserModel } from './user-model';
// anggota kelompok tani
export class AnggotaKelompokModel {
  id?: string;
  kelompok_id: string;
  kelompok_tani?: UserModel; // dengan role = 1 atau KELOMPOK_TANI
  nama: string;
  nik: string;
  alamat: string;
}
