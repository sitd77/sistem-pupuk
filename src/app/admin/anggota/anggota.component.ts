import { Subscription } from 'rxjs';
import { AnggotaService } from './../../../services/anggota.service';
import { FormAnggotaComponent } from './../../shared/form-anggota/form-anggota.component';
import { MatDialog } from '@angular/material/dialog';
import {
  AfterViewInit,
  Component,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AnggotaKelompokModel } from 'src/models/kelompok-tani';

@Component({
  selector: 'app-anggota',
  templateUrl: './anggota.component.html',
  styleUrls: ['./anggota.component.scss'],
})
export class AnggotaComponent implements AfterViewInit, OnDestroy, OnInit {
  displayedColumns: string[] = [
    'position',
    'nama',
    'nik',
    'alamat',
    'role',
    'status_kartu',
    'luas_lahan',
    'aksi',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<AnggotaKelompokModel>;
  totalLuasLahan: number = 0;
  sub: Subscription;

  getLevelAnggota(role: number): string {
    const listAnggotaRole: string[] = [
      'ANGGOTA',
      'BENDAHARA',
      'SEKRETARIS',
      'KETUA',
    ];
    return listAnggotaRole[role - 1];
  }

  getStatusKartu(status: number): string {
    const listStatusKartu: string[] = [
      'BELUM ADA',
      'SEDANG DIPROSES',
      'SUDAH ADA',
    ];

    return listStatusKartu[status - 1];
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
    this.service.$listAnggota.subscribe((list) => {
      this.totalLuasLahan = 0;
      if (list) {
        this.dataSource = new MatTableDataSource<AnggotaKelompokModel>(list);
        this.dataSource.paginator = this.paginator;
        list.forEach((l) => {
          this.totalLuasLahan += parseFloat(l.luas_lahan.toString());
        });
      }
    });
  }

  /**
   * constructor
   */
  constructor(public dialog: MatDialog, public service: AnggotaService) {}

  /**
   * open dialog
   */
  openDialog() {
    this.dialog.open(FormAnggotaComponent);
  }

  /**
   * lakukan perubahan data
   * @param item
   */
  edit(item: AnggotaKelompokModel) {
    this.dialog.open(FormAnggotaComponent, {
      data: {
        model: item,
      },
    });
  }

  /**
   * after init
   */
  ngAfterViewInit() {}
}
