import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { UserModel, UserRole } from 'src/models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // var's
  private collection: string = 'users';
  public $listKelompokTani: Observable<UserModel[]>;

  // konstructor
  constructor(private firestore: AngularFirestore) {
    // list kelompok tani
    this.$listKelompokTani = this.firestore
      .collection(this.collection, (ref) =>
        ref.where('role', '==', UserRole.KELOMPOK_TANI)
      )
      .valueChanges({ idField: 'id' }) as Observable<UserModel[]>;
  }
}
