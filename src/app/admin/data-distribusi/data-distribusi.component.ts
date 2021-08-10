import { AuthService } from './../../../services/auth.service';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {
  IPermohonan,
  DistribusiPupukModel,
  IResultDetail,
} from 'src/models/permohonan-model';
import { UserModel } from 'src/models/user-model';
import { PermohonanService } from 'src/services/permohonan.service';
import { SwalService } from 'src/services/swal.service';
import { UsersService } from 'src/services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-data-distribusi',
  templateUrl: './data-distribusi.component.html',
  styleUrls: ['./data-distribusi.component.scss'],
})
export class DataDistribusiComponent implements OnInit {
  displayedColumns: string[] = [
    'nomor',
    'nik',
    'nama',
    'luas_lahan',
    'urea_mt1',
    'urea_mt2',
    'urea_mt3',
    'sp36_mt1',
    'sp36_mt2',
    'sp36_mt3',
    'za_mt1',
    'za_mt2',
    'za_mt3',
    'npk_mt1',
    'npk_mt2',
    'npk_mt3',
    'organik_mt1',
    'organik_mt2',
    'organik_mt3',
  ];
  dr1: string[] = ['nomorx', 'nikx', 'namax', 'luasx', 'title'];
  dr2: string[] = ['u', 's', 'z', 'n', 'o'];

  currentData: IPermohonan;
  currentDataSource: MatTableDataSource<DistribusiPupukModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // for detail
  isDetailPembagianOpen: boolean = false;
  model: DistribusiPupukModel;
  permohonan: IPermohonan;

  // user subscription
  subUser: Subscription;
  currentLevel: number = 0;

  /**
   * subscription
   * @param usersService
   * @param service
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    public dialogRef: MatDialogRef<DataDistribusiComponent>,
    private fb: FormBuilder,
    private dialog: SwalService,
    private authService: AuthService, // current user service
    public usersService: UsersService, // service untuk mendapatkan data users
    public service: PermohonanService // service untuk data permohonan pupuk
  ) {
    this.subUser = this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.currentLevel = user.role;
      }
    });
  }

  closeMe(): void {
    this.dialogRef.close();
  }

  /**
   * inisialisasi data distribusi pupuk
   */
  initData(k: UserModel) {
    this.dialog.loading('Memuat data ...');
    this.service.getPermohonanByKelompok(k).then((data) => {
      const d = data;

      let totalLuas: number = 0;
      let urea_mt1: number = 0;
      let urea_mt2: number = 0;
      let urea_mt3: number = 0;
      let sp36_mt1: number = 0;
      let sp36_mt2: number = 0;
      let sp36_mt3: number = 0;
      let za_mt1: number = 0;
      let za_mt2: number = 0;
      let za_mt3: number = 0;
      let npk_mt1: number = 0;
      let npk_mt2: number = 0;
      let npk_mt3: number = 0;
      let organik_mt1: number = 0;
      let organik_mt2: number = 0;
      let organik_mt3: number = 0;
      d.data.forEach((dt) => {
        totalLuas += parseFloat(dt.anggota.luas_lahan.toString());
        urea_mt1 += parseFloat(dt.urea_mt1.total.toString());
        urea_mt2 += parseFloat(dt.urea_mt2.total.toString());
        urea_mt3 += parseFloat(dt.urea_mt3.total.toString());
        sp36_mt1 += parseFloat(dt.sp36_mt1.total.toString());
        sp36_mt2 += parseFloat(dt.sp36_mt2.total.toString());
        sp36_mt3 += parseFloat(dt.sp36_mt3.total.toString());
        za_mt1 += parseFloat(dt.za_mt1.total.toString());
        za_mt2 += parseFloat(dt.za_mt2.total.toString());
        za_mt3 += parseFloat(dt.za_mt3.total.toString());
        npk_mt1 += parseFloat(dt.npk_mt1.total.toString());
        npk_mt2 += parseFloat(dt.npk_mt2.total.toString());
        npk_mt3 += parseFloat(dt.npk_mt3.total.toString());
        organik_mt1 += parseFloat(dt.organik_mt1.total.toString());
        organik_mt2 += parseFloat(dt.organik_mt2.total.toString());
        organik_mt3 += parseFloat(dt.organik_mt3.total.toString());
      });

      // buat validators untuk form
      const validators = [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]*$'),
      ];
      // buat controls untuk form
      const controls: Object = {};
      d.data.forEach((dt) => {
        controls['urea_mt1' + dt.anggota.id] = new FormControl(
          dt.urea_mt1.total,
          validators
        );
        controls['urea_mt2' + dt.anggota.id] = new FormControl(
          dt.urea_mt2.total,
          validators
        );
        controls['urea_mt3' + dt.anggota.id] = new FormControl(
          dt.urea_mt3.total,
          validators
        );
        controls['sp36_mt1' + dt.anggota.id] = new FormControl(
          dt.sp36_mt1.total,
          validators
        );
        controls['sp36_mt2' + dt.anggota.id] = new FormControl(
          dt.sp36_mt2.total,
          validators
        );
        controls['sp36_mt3' + dt.anggota.id] = new FormControl(
          dt.sp36_mt3.total,
          validators
        );
        controls['za_mt1' + dt.anggota.id] = new FormControl(
          dt.za_mt1.total,
          validators
        );
        controls['za_mt2' + dt.anggota.id] = new FormControl(
          dt.za_mt2.total,
          validators
        );
        controls['za_mt3' + dt.anggota.id] = new FormControl(
          dt.za_mt3.total,
          validators
        );
        controls['npk_mt1' + dt.anggota.id] = new FormControl(
          dt.npk_mt1.total,
          validators
        );
        controls['npk_mt2' + dt.anggota.id] = new FormControl(
          dt.npk_mt2.total,
          validators
        );
        controls['npk_mt3' + dt.anggota.id] = new FormControl(
          dt.npk_mt3.total,
          validators
        );
        controls['organik_mt1' + dt.anggota.id] = new FormControl(
          dt.organik_mt1.total,
          validators
        );
        controls['organik_mt2' + dt.anggota.id] = new FormControl(
          dt.organik_mt2.total,
          validators
        );
        controls['organik_mt3' + dt.anggota.id] = new FormControl(
          dt.organik_mt3.total,
          validators
        );
      });

      // buat form
      this.currentData = {
        datasource: new MatTableDataSource<DistribusiPupukModel>(d.data),
        kelompok: d.kelompok_tani,
        total_luas: totalLuas,
        urea_mt1: urea_mt1,
        urea_mt2: urea_mt2,
        urea_mt3: urea_mt3,
        sp36_mt1: sp36_mt1,
        sp36_mt2: sp36_mt2,
        sp36_mt3: sp36_mt3,
        za_mt1: za_mt1,
        za_mt2: za_mt2,
        za_mt3: za_mt3,
        npk_mt1: npk_mt1,
        npk_mt2: npk_mt2,
        npk_mt3: npk_mt3,
        organik_mt1: organik_mt1,
        organik_mt2: organik_mt2,
        organik_mt3: organik_mt3,
        form: this.fb.group(controls),
      };
    });
    this.dialog.close();
  }

  /**
   * init page
   */
  ngOnInit(): void {
    this.initData(this.data);
  }

  /**
   * submit form yang telah diisi
   * @param permohonan
   */
  async submitForm(): Promise<void> {
    const permohonan = this.currentData;
    const currentData = permohonan.datasource.data;
    const newData = currentData.map((d) => {
      d.urea_mt1.total = parseInt(d.urea_mt1.total.toString());
      d.urea_mt2.total = parseInt(d.urea_mt2.total.toString());
      d.urea_mt3.total = parseInt(d.urea_mt3.total.toString());
      d.sp36_mt1.total = parseInt(d.sp36_mt1.total.toString());
      d.sp36_mt2.total = parseInt(d.sp36_mt2.total.toString());
      d.sp36_mt3.total = parseInt(d.sp36_mt3.total.toString());
      d.za_mt1.total = parseInt(d.za_mt1.total.toString());
      d.za_mt2.total = parseInt(d.za_mt2.total.toString());
      d.za_mt3.total = parseInt(d.za_mt3.total.toString());
      d.npk_mt1.total = parseInt(d.npk_mt1.total.toString());
      d.npk_mt2.total = parseInt(d.npk_mt2.total.toString());
      d.npk_mt3.total = parseInt(d.npk_mt3.total.toString());
      d.organik_mt1.total = parseInt(d.organik_mt1.total.toString());
      d.organik_mt2.total = parseInt(d.organik_mt2.total.toString());
      d.organik_mt3.total = parseInt(d.organik_mt3.total.toString());
      return d;
    });

    // simpan data baru
    await this.service.savePermohonan(permohonan, newData);
    this.initData(this.data);
  }

  /**
   * buka form detail pembagian
   * @param model
   */
  openDetailPembagian(
    model: DistribusiPupukModel,
    permohonan: IPermohonan
  ): void {
    if (this.currentLevel != 2) {
      return;
    }

    this.model = model;
    this.permohonan = permohonan;
    this.isDetailPembagianOpen = true;
  }

  /**
   * saat form ditutup
   */
  onDetailClosed(): void {
    this.isDetailPembagianOpen = false;
    this.model = null;
    this.permohonan = null;
  }

  /**
   * saat model diupdate
   * @param newModel
   */
  onDetailUpdated(result: IResultDetail): void {
    const currentData = result.permohonan.datasource.data;

    const newData = currentData.map((d) => {
      if (d.anggota.id == result.distribusi.anggota.id) {
        return result.distribusi;
      } else {
        return d;
      }
    });
    this.currentData.datasource.data = newData;
    this.submitForm();
  }
}
