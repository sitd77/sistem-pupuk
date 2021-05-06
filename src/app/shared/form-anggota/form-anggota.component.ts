import { AnggotaService } from './../../../services/anggota.service';
import { AuthService } from 'src/services/auth.service';
import { UserModel } from './../../../models/user-model';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AnggotaKelompokModel } from 'src/models/kelompok-tani';

@Component({
  selector: 'app-form-anggota',
  templateUrl: './form-anggota.component.html',
  styleUrls: ['./form-anggota.component.scss'],
})
export class FormAnggotaComponent implements OnInit, OnDestroy {
  // var's
  form: FormGroup;
  listAnggotaRole: string[] = ['ANGGOTA', 'BENDAHARA', 'SEKRETARIS', 'KETUA'];
  sub: Subscription;
  currentUser: UserModel;

  /**
   * constructor
   * @param fb
   * @param dialogRef
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private service: AnggotaService,
    public dialogRef: MatDialogRef<FormAnggotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sub = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  /**
   * lepaskan memory
   */
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  /**
   * init page
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      nama: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nik: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern('^[0-9]*$'),
      ]),
      alamat: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      luas_lahan: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.min(1),
        Validators.pattern('^[0-9.]*$'),
      ]),
      role: new FormControl(1, [Validators.required]),
      status_kartu: new FormControl(1, [Validators.required]),
    });

    if (this.data) {
      this.form.patchValue(this.data.model);
    }
  }

  /**
   * tutup form
   */
  closeForm() {
    this.dialogRef.close();
    this.form?.reset();
  }

  /**
   * submit form
   */
  async submitForm(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // buat model
      const model = this.form.value as AnggotaKelompokModel;
      model.kelompok_id = this.currentUser.id;

      // validasi
      if (this.data) {
        await this.service.updateData(this.data.model.id, model);
      } else {
        await this.service.addData(model);
      }

      this.closeForm();
    }
  }

  // ------------------------------ GETTER'S
  get nama(): FormControl {
    return this.form.get('nama') as FormControl;
  }

  get nik(): FormControl {
    return this.form.get('nik') as FormControl;
  }

  get alamat(): FormControl {
    return this.form.get('alamat') as FormControl;
  }

  get luas_lahan(): FormControl {
    return this.form.get('luas_lahan') as FormControl;
  }

  get role(): FormControl {
    return this.form.get('role') as FormControl;
  }

  get status_kartu(): FormControl {
    return this.form.get('status_kartu') as FormControl;
  }
}
