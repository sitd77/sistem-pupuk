import { KelompokViewComponent } from './kelompok-view/kelompok-view.component';
import { ProfilComponent } from './profil/profil.component';
import { PermohonanComponent } from './permohonan/permohonan.component';
import { PembagianPupukComponent } from './pembagian-pupuk/pembagian-pupuk.component';
import { AnggotaComponent } from './anggota/anggota.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  // kelompok tani
  {
    path: 'anggota-kelompok',
    component: AnggotaComponent,
  },

  // toko pembagi tani
  {
    path: 'distribusi-pupuk',
    component: PembagianPupukComponent,
  },

  // dinas
  {
    path: 'pengajuan',
    component: PermohonanComponent,
  },

  {
    path: 'kelompok-tani',
    component: KelompokViewComponent,
  },

  // untuk semua
  {
    path: 'profil',
    component: ProfilComponent,
  },

  // redirect
  {
    path: '',
    redirectTo: 'kelompok-tani',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
