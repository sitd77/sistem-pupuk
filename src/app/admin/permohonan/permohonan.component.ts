import { UserModel } from './../../../models/user-model';
import { Subscription } from 'rxjs';
import { PermohonanService } from './../../../services/permohonan.service';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-permohonan',
  templateUrl: './permohonan.component.html',
  styleUrls: ['./permohonan.component.scss'],
})
export class PermohonanComponent implements OnInit, OnDestroy {
  // var's
  sub: Subscription;
  listKelompokTani: UserModel[];
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

  /**
   * subscription
   * @param usersService
   * @param service
   */
  constructor(
    public usersService: UsersService, // service untuk mendapatkan data users
    public service: PermohonanService
  ) {}

  /**
   * init page
   */
  ngOnInit(): void {
    this.sub = this.usersService.$listKelompokTani.subscribe((list) => {
      this.listKelompokTani = list;
    });
  }

  /**
   * lepaskan memory
   */
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
