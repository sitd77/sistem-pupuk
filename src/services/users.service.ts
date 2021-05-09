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

  async getListKelompokTani(): Promise<UserModel[]> {
    let listUser: UserModel[] = [];

    const req = await this.firestore
      .collection(this.collection)
      .get()
      .toPromise();
    if (req.size > 0) {
      await Promise.all(
        req.docs.map(async (doc) => {
          const data: UserModel = doc.data() as UserModel;
          data.id = doc.id;

          if (data.role == UserRole.KELOMPOK_TANI) {
            listUser.push(data);
          }
        })
      );
    }

    return listUser;
  }
}
