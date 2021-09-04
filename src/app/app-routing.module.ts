import { AdminComponent } from './admin/admin/admin.component';
import { LandingComponent } from './shared/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

// auth guard firebase
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['landing']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['admin']);

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToDashboard,
    },
  },

  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
