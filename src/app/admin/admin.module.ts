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

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    AnggotaComponent,
    PermohonanComponent,
    PembagianPupukComponent,
    ProfilComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
