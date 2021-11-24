export enum UserRole {
  DINAS_PERTANIAN = 1,
  TOKO_PUPUK = 2,
  KELOMPOK_TANI = 3,
}

export class UserModel {
  id?: string;
  email: string;
  password: string;
  nama: string;
  role: UserRole = UserRole.KELOMPOK_TANI;

  // keperluan untuk kelompok tani
  alamat: string = '';
  // desa?: string;
  // kecamatan?: string = 'Matakali';
  // gapoktan?: string = 'REA JAYA';
  // subsektor?: string = 'Perkebunan';
}
