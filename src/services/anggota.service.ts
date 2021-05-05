import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { SwalService } from './swal.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnggotaKelompokModel } from 'src/models/kelompok-tani';

@Injectable({
  providedIn: 'root',
})
export class AnggotaService {
  private collection: string = 'anggota';
  public $listAnggota: Observable<AnggotaKelompokModel[]>;

  constructor(
    private firestore: AngularFirestore,
    private dialog: SwalService,
    private authsService: AuthService
  ) {
    this.authsService.currentUser.subscribe((user) => {
      if (user) {
        this.$listAnggota = this.firestore
          .collection(this.collection, (ref) =>
            ref.where('kelompok_id', '==', user.id)
          )
          .valueChanges({ idField: 'id' }) as Observable<
          AnggotaKelompokModel[]
        >;
      }
    });
  }

  /**
   * penambahan data
   * @param model
   */
  async addData(model: AnggotaKelompokModel): Promise<void> {
    // progress
    this.dialog.loading('Menambahkan data baru ...');
    // error handling
    try {
      // penambahan data anggota kelompok tanie
      await this.firestore.collection(this.collection).add(model);
      // upload sukses
      this.dialog.success('Penambahan data sukses.');
    } catch (error) {
      // error
      console.log(
        'ERROR',
        'Terjadi kesalahan saat penambahan data anggota kelompok tani : ' +
          error
      );
      this.dialog.error(
        'Terjadi kesalahan saat penambahan data anggota kelompok tani : ' +
          error
      );
    }
  }

  /**
   * pengeditan data
   * @param currentId
   * @param model
   */
  async updateData(
    currentId: string,
    model: AnggotaKelompokModel
  ): Promise<void> {
    // progress
    this.dialog.loading('Memperbarui data ...');
    // error handling
    try {
      delete model.kelompok_tani;
      // penambahan data anggota kelompok tanie
      await this.firestore
        .collection(this.collection)
        .doc(currentId)
        .update(model);
      // upload sukses
      this.dialog.success('Perubahan data sukses.');
    } catch (error) {
      // error
      console.log(
        'ERROR',
        'Terjadi kesalahan saat perubahan data anggota kelompok tani : ' + error
      );
      this.dialog.error(
        'Terjadi kesalahan saat perubahan data anggota kelompok tani : ' + error
      );
    }
  }

  /**
   * penghapusan
   * @param currentId
   */
  async deleteData(currentId: string): Promise<void> {
    const prompt = await this.dialog.question(
      'Delete',
      'Anda yakin ingin menghapus data ini ?'
    );
    if (prompt.isConfirmed) {
      // progress
      this.dialog.loading('Menghapus data ...');
      // error handling
      try {
        // penghapusan data anggota kelompok tanie
        await this.firestore
          .collection(this.collection)
          .doc(currentId)
          .delete();
        // upload sukses
        this.dialog.success('Penghapusan data sukses.');
      } catch (error) {
        // error
        console.log(
          'ERROR',
          'Terjadi kesalahan saat penghapusan data anggota kelompok tani : ' +
            error
        );
        this.dialog.error(
          'Terjadi kesalahan saat penghapusan data anggota kelompok tani : ' +
            error
        );
      }
    }
  }
}
