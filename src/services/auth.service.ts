import { UserModel } from './../models/user-model';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { SwalService } from './swal.service';
import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // variabels
  private collection: string = 'users';
  // key that is used to access the data in local storage
  private STORAGE_KEY = 'pill-searcher-web';

  public currentUser: BehaviorSubject<
    UserModel | undefined
  > = new BehaviorSubject(null);

  // constructor service
  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private dialog: SwalService,
    private auth: AngularFireAuth, // angular fire auth
    private firestore: AngularFirestore, // firestore
    private router: Router // untuk redirect halaman
  ) {
    // subscribe router
    this.router.events.pipe(distinctUntilChanged()).subscribe((event) => {
      if (event['id'] == 1) {
        this.checkUser();
      }
    });
  }

  /**
   * mengecek dan redirect user jika sudah login
   * @returns void
   */
  async checkUser(): Promise<void> {
    if (this.isLoggedIn) {
      // user sudah login, redirect user ke halaman dashboard
      this.currentUser.next(this.getUserModel());
      this.router.navigate(['admin/']);
    } else {
      // user belum login, redirect ke halaman landing
      this.currentUser.next(null);
      await this.router.navigate(['landing/']);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  /**
   * keluar dari sistem
   * @returns void
   */
  async logout(): Promise<void> {
    const prompt = await this.dialog.question(
      'LogOut',
      'Anda yakin ingin keluar dari sistem ?'
    );
    if (prompt.isConfirmed) {
      this.auth.signOut();
      this.clearStorage();
      this.checkUser();

      // pastikan tidak ada user
      this.currentUser.next(null);

      setTimeout(() => {
        this.router.navigate(['landing/']);
        window.location.reload();
      }, 10);
    }
  }

  /**
   * fungsi update profil
   * @param model
   * @param newModel
   */
  async update(model: UserModel, newModel: UserModel): Promise<void> {
    // progress
    this.dialog.loading('Mengupdate profil ...');
    // error handling
    try {
      // update profile
      await this.firestore
        .collection(this.collection)
        .doc(model.id)
        .update(newModel);
      // simpan model baru
      newModel.id = model.id;
      this.saveUserModel(newModel);
      // update model di memory
      this.checkUser();
      this.currentUser.next(newModel);

      // upload sukses
      this.dialog.success('Pembaruan profil sukses.');
    } catch (error) {
      // error
      console.log('ERROR', 'Terjadi kesalahan saat update profil : ' + error);
      this.dialog.error('Terjadi kesalahan saat update profil : ' + error);
    }
  }

  /**
   * fungsi registrasi rumah sakit baru
   * @async
   * @param UserModel
   * @return void
   */
  async register(model: UserModel): Promise<void> {
    // register data baru,
    // loading progress
    this.dialog.loading('Sedang melakukan registrasi akun baru ...');
    // // error handling
    try {
      // registrasi authentikasi
      const id = await this.auth.createUserWithEmailAndPassword(
        model.email,
        model.password
      );

      // authentikasi sukses
      if (id.user) {
        const uID = id.user.uid;

        // update model
        model.role =
          typeof model.role == 'string' ? parseInt(model.role) : model.role;

        // kirim data registrasi
        await this.firestore.collection(this.collection).doc(uID).set(model);

        // simpan data
        const dataToStore = { ...model, id: uID } as UserModel;
        this.saveUserModel(dataToStore);

        // sukses
        await this.dialog.success('Registrasi berhasil.');
        this.currentUser.next(dataToStore);

        this.checkUser();
      }
    } catch (error) {
      // error
      this.dialog.close();

      if (error.code == 'auth/email-already-in-use') {
        this.dialog.error(
          'Email / username tersebut sudah digunakan.',
          'ID Exists'
        );
      } else {
        console.log('Terjadi kesalahan saat registrasi : ' + error);
        this.dialog.error('Terjadi kesalahan saat registrasi RS : ' + error);
      }
    }
  }

  /**
   * fungsi untuk login / masuk kedalam sistem
   * @param username
   * @param password
   * @returns UserModel | undefined
   */
  async login(
    username: string,
    password: string
  ): Promise<UserModel | undefined> {
    // authentikasi data baru
    // loading progress
    this.dialog.loading('Autentikasi pengguna ...');
    // error handling
    try {
      // masuk ke sistem
      const id = await this.auth.signInWithEmailAndPassword(username, password);

      // cek user
      if (id.user) {
        // autentikasi berhasil
        const uID = id.user.uid;
        // ambil data pengguna
        const doc = await this.firestore
          .collection(this.collection)
          .doc(uID)
          .get()
          .toPromise();
        // parsing data
        if (doc.exists) {
          // ambil model data
          const data = doc.data();
          const model = { ...(data as UserModel), id: uID } as UserModel;
          // simpan data baru
          this.saveUserModel(model);
          // success
          await this.dialog.success('Autentikasi berhasil.');
          this.checkUser();
        }
      } else {
        // autentikasi gagal
        this.dialog.error(
          'Autentikasi gagal. Periksa email dan password anda !'
        );
      }
    } catch (error) {
      if (error.code == 'auth/user-not-found') {
        this.dialog.error(
          'Autentikasi gagal. Periksa email dan password anda !',
          'Access Denied'
        );
      } else {
        console.log('Terjadi kesalahan saat login : ' + error);
        this.dialog.error('Terjadi kesalahan saat login : ' + error);
      }
    }
    return;
  }

  // ----------------------------------- LOCAL STORAGE -----------------------------
  /**
   * simpan model baru ke localstorage
   * @param model
   */
  saveUserModel(model: UserModel): void {
    // hapus storage lama
    this.clearStorage();

    // simpan yang baru
    this.storage.set(this.STORAGE_KEY, model);
  }

  /**
   * bersihkan storage
   */
  clearStorage(): void {
    this.storage.remove(this.STORAGE_KEY);
    this.storage.clear();
  }

  /**
   * cek apakah user ada atau ndak ada
   * @returns boolean
   */
  isLoggedIn(): boolean {
    return this.storage.has(this.STORAGE_KEY);
  }

  /**
   * mengambil model yang tersimpan di-localstorage
   * @returns UserModel
   */
  getUserModel(): UserModel {
    const model = this.storage.get(this.STORAGE_KEY) as UserModel;
    return model;
  }

  /**
   * dapatkan data user berdasarkan id
   * @param id
   */
  async getUserByID(id: string): Promise<UserModel> {
    let user: UserModel;

    try {
      const doc = await this.firestore
        .collection(this.collection)
        .doc(id)
        .get()
        .toPromise();
      if (doc.exists) {
        user = {
          ...(doc.data() as UserModel),
          id: id,
        };
      }
    } catch (error) {
      console.log(error);
      this.dialog.error(
        'Terjadi kesalahan saat mengambil user berdasarkan id ' + error
      );
    }
    return user;
  }
}
