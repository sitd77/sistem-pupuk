import { ReportViewComponent } from './../report-view/report-view.component';
import { DataDistribusiComponent } from './../data-distribusi/data-distribusi.component';
import { DetailPengajuanComponent } from './../detail-pengajuan/detail-pengajuan.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../../services/auth.service';
import { UserModel } from './../../../models/user-model';
import { Subscription } from 'rxjs';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-kelompok-view',
  templateUrl: './kelompok-view.component.html',
  styleUrls: ['./kelompok-view.component.scss'],
})
export class KelompokViewComponent implements OnInit, OnDestroy {
  subs: Subscription;
  sub: Subscription;
  listData: UserModel[] = [];
  currentUser: UserModel;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService, // service auth
    private usersService: UsersService // service untuk data user
  ) {}

  ngOnInit() {
    this.sub = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;

    });

    this.subs = this.usersService.$listKelompokTani.subscribe((list) => {
      this.listData = [];
      if (list) {
        this.listData = list;
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.subs?.unsubscribe();
  }

  openReportForm(k: UserModel) {
    this.dialog.open(ReportViewComponent, {
      data: {
        kelompok_id: k.id,
        ...k,
      },
      // panelClass: 'fullscreen',
      // position: {
      //   top: '0px',
      //   left: '0px',
      // },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    });
  }

  openDistribusiForm(k: UserModel) {
    this.dialog.open(DataDistribusiComponent, {
      data: k,
      // panelClass: 'fullscreen',
      // position: {
      //   top: '0px',
      //   left: '0px',
      // },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    });
  }

  openPengajuanForm(k: UserModel) {
    this.dialog.open(DetailPengajuanComponent, {
      data: k,
      // panelClass: 'fullscreen',
      // position: {
      //   top: '0px',
      //   left: '0px',
      // },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
    });
  }
}
