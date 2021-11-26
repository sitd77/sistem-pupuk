import firebase from 'firebase';
import { UserModel } from './../models/user-model';
import { AnggotaKelompokModel } from 'src/models/kelompok-tani';
import {
  DistribusiPupukModel,
  IPermohonan,
} from './../models/permohonan-model';
import { AnggotaService } from './anggota.service';
import { UsersService } from './users.service';
import { SwalService } from './swal.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PermohonanPupukModel } from 'src/models/permohonan-model';

@Injectable({
  providedIn: 'root',
})
export class PermohonanService {
  /// var's
  public $listPermohonan: Observable<any>;
  public $listReport: Observable<any>;
  private _collection: string = 'permohonan';
  private _reportCollection: string = 'report';

  /**
   * konstructor
   * @param firestore
   * @param dialog
   */
  constructor(
    private firestore: AngularFirestore,
    private usersService: UsersService,
    private dialog: SwalService,
    private anggotaService: AnggotaService
  ) {
    // subscribe data changes
    this.firestore.collection(this._collection).valueChanges;
    this.firestore.collection(this._reportCollection, (ref) =>
      ref.orderBy('kelompok_id', 'desc')
    ).valueChanges;
  }

  /**
   * simpan data permohonan yang baru
   * @param kelompokID
   * @param anggotaModel
   * @returns
   */
  async savePermohonan(permohonan: IPermohonan, data: DistribusiPupukModel[]) {
    this.dialog.loading(
      'Memperbarui data kelompok tani ' + permohonan.kelompok.nama
    );
    // error handler
    try {
      // simpan data baru
      const dataAsJSObject = data.map((obj) => {
        return Object.assign({}, obj);
      });
      console.log('savePermohonan', dataAsJSObject);
      // asynchronous firestore
      await this.firestore
        .collection(this._collection)
        .doc(permohonan.kelompok.id)
        .set({
          data: dataAsJSObject,
        });

      // log ketika sukses
      this.dialog.toastsuccess(
        'Entri data untuk kelompok tani ' +
          permohonan.kelompok.nama +
          ' berhasil.'
      );

      // catch error jika ada
    } catch (error) {
      // log error
      console.log(error);
      this.dialog.error(
        'Terjadi kesalahan saat entri data permohonan : ' + error
      );
    }
  }

  /**
   * dapatkan data permohonan berdasarkan id anggota
   * @param kelompokID
   * @param anggotaModel
   * @returns
   */
  async getPermohonanByAnggotaID(
    kelompokID: string,
    anggotaModel: AnggotaKelompokModel
  ): Promise<DistribusiPupukModel> {
    let model: DistribusiPupukModel = new DistribusiPupukModel();

    // ambil data dari server
    const req = await this.firestore
      .collection(this._collection)
      .doc(kelompokID)
      .get()
      .toPromise();
    if (req.exists) {
      // jika ada pasti berada pada index 0 atau data pertama
      const doc = req;
      const data = doc.data();
      const id = doc.id;
      const models = data['data'] as DistribusiPupukModel[];

      for (let i = 0; i < models.length; i++) {
        if (models[i].anggota.id == anggotaModel.id) {
          model = models[i];
          break;
        }
      }

      model.id = id;
      model.anggota = anggotaModel;
    }

    return model;
  }

  /**
   * dapatkan daftar permohan pupuk
   */
  async getListPermohonanForDinas(): Promise<PermohonanPupukModel[]> {
    let listData: PermohonanPupukModel[] = [];

    // ambil data pengguna
    const listKelompok = await this.usersService.getListKelompokTani();

    // error handler
    try {
      // ambil daftar data permohonan pada setiap anggota kelompok tani
      await Promise.all(
        listKelompok.map(async (kelompokTani) => {
          // buat template variabel untuk menampung data permohonan dari kelompok tani
          let listDataPermohonan: DistribusiPupukModel[] = [];
          // ambil daftar anggota dari kelompok tani
          const listAnggotaKelompok: AnggotaKelompokModel[] =
            await this.anggotaService.getAnggotaByIDKelompok(kelompokTani.id);
          // iterasi pada daftar anggota kelompok tani dan dapatkan data permohonannya
          await Promise.all(
            listAnggotaKelompok.map(async (anggota) => {
              // ambil data distribusi pupuk
              const model = await this.getPermohonanByAnggotaID(
                kelompokTani.id,
                anggota
              );
              model.anggota_id = anggota.id;
              model.anggota = anggota;
              // tambahkan data ke array
              listDataPermohonan.push(model);
            })
          );
          // tambahkan permohonan ke data
          const modelPermohonan: PermohonanPupukModel =
            new PermohonanPupukModel();
          modelPermohonan.data = listDataPermohonan;
          modelPermohonan.kelompok_id = kelompokTani.id;
          modelPermohonan.kelompok_tani = kelompokTani;
          // masukkan ke array
          listData.push(modelPermohonan);
        })
      );
    } catch (error) {
      // jika terjadi error
      this.dialog.error(
        'Terjadi kesalahan saat pengambilan daftar data permohonan untuk dinas : ' +
          error
      );
      console.log(error);
    }
    // kembalikan data memory
    return listData;
  }

  /**
   * dapatkan data permohonan untuk spesifik kelompok
   */
  async getPermohonanByKelompok(
    kelompokTani: UserModel
  ): Promise<PermohonanPupukModel> {
    // tambahkan permohonan ke data
    const modelPermohonan: PermohonanPupukModel = new PermohonanPupukModel();
    try {
      // buat template variabel untuk menampung data permohonan dari kelompok tani
      let listDataPermohonan: DistribusiPupukModel[] = [];
      // ambil daftar anggota dari kelompok tani
      const listAnggotaKelompok: AnggotaKelompokModel[] =
        await this.anggotaService.getAnggotaByIDKelompok(kelompokTani.id);
      // iterasi pada daftar anggota kelompok tani dan dapatkan data permohonannya
      await Promise.all(
        listAnggotaKelompok.map(async (anggota) => {
          // ambil data distribusi pupuk
          const model = await this.getPermohonanByAnggotaID(
            kelompokTani.id,
            anggota
          );
          model.anggota_id = anggota.id;
          model.anggota = anggota;
          // tambahkan data ke array
          listDataPermohonan.push(model);
        })
      );
      modelPermohonan.data = listDataPermohonan;
      modelPermohonan.kelompok_id = kelompokTani.id;
      modelPermohonan.kelompok_tani = kelompokTani;
    } catch (error) {
      // jika terjadi error
      this.dialog.error(
        'Terjadi kesalahan saat pengambilan daftar data permohonan untuk dinas : ' +
          error
      );
      console.log(error);
    }
    return modelPermohonan;
  }

  /**
   * penambahan report baru
   */
  async submitNewReport(
    anggota: AnggotaKelompokModel,
    kelompokId: string,
    report: string
  ): Promise<void> {
    this.dialog.loading('Memperbarui laporan ...');
    // error handler
    try {
      // cari data anggota
      const r = await this.firestore
        .collection('users')
        .doc(kelompokId)
        .get()
        .toPromise();
      let kelompok_nama = '';
      if (r.exists) {
        const dataKelompok = r.data();
        kelompok_nama = dataKelompok['nama'];
      }

      // asynchronous firestore
      await this.firestore.collection(this._reportCollection).add({
        anggota_id: anggota.id,
        kelompok_id: kelompokId,
        anggota: anggota.nama,
        nik: anggota.nik,
        kelompok: kelompok_nama,
        pengambilan: report,
        tanggal: firebase.firestore.Timestamp.now(),
      });

      // log ketika sukses
      this.dialog.toastsuccess('Entri report berhasil.');

      // catch error jika ada
    } catch (error) {
      // log error
      console.log(error);
      this.dialog.error('Terjadi kesalahan saat entri data report : ' + error);
    }
  }

  /**
   * dapatkan daftar report
   */
  async getListReport(kelompokId: string): Promise<any> {
    let data = [];
    const r = await this.firestore
      .collection(this._reportCollection, (ref) =>
        ref.orderBy('tanggal', 'desc')
      )
      .get()
      .toPromise();
    if (r.size > 0) {
      r.docs.forEach((doc) => {
        const d = doc.data();
        if (d['kelompok_id'] == kelompokId) {
          data.push({
            id: doc.id,
            ...(d as Object),
          });
        }
      });
    }
    //console.log(data)
    return data;
  }
}
