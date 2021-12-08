import { ReportViewComponent } from './report-view/report-view.component';
import { DataDistribusiComponent } from './data-distribusi/data-distribusi.component';
import { DetailPengajuanComponent } from './detail-pengajuan/detail-pengajuan.component';
import { KelompokViewComponent } from './kelompok-view/kelompok-view.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnggotaComponent } from './anggota/anggota.component';
import { PermohonanComponent } from './permohonan/permohonan.component';
import { PembagianPupukComponent } from './pembagian-pupuk/pembagian-pupuk.component';
import { ProfilComponent } from './profil/profil.component';
import { JumlahPupukComponent } from '../jumlah-pupuk/jumlah-pupuk.component';
import { PupukItemComponent } from '../pupuk-item/pupuk-item.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AnggotaComponent,
    PermohonanComponent,
    PembagianPupukComponent,
    ProfilComponent,
    KelompokViewComponent,
    DetailPengajuanComponent,
    DataDistribusiComponent,
    ReportViewComponent,
    JumlahPupukComponent,
    PupukItemComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
