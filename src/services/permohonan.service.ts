import { SwalService } from './swal.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermohonanService {
  /// var's
  public $listPermohonan: Observable<any>;
  private _collection: string = 'permohonan';

  /**
   * konstructor
   * @param firestore
   * @param dialog
   */
  constructor(
    private firestore: AngularFirestore,
    private dialog: SwalService
  ) {
    // subscribe data changes
    this.firestore.collection(this._collection).valueChanges;
  }
}
