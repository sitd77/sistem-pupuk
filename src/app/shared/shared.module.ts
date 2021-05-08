import { HargaPupukComponent } from './harga-pupuk/harga-pupuk.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormAnggotaComponent } from './form-anggota/form-anggota.component';
import { FormPermohonanComponent } from './form-permohonan/form-permohonan.component';
import { NodataWidgetComponent } from './nodata-widget/nodata-widget.component';

@NgModule({
  declarations: [
    LandingComponent,
    SignInComponent,
    SignUpComponent,
    FormAnggotaComponent,
    FormPermohonanComponent,
    NodataWidgetComponent,
    HargaPupukComponent,
  ],
  imports: [
    CommonModule,

    RouterModule,

    FlexLayoutModule,

    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
  ],
  exports: [
    // export component's
    LandingComponent,
    SignInComponent,
    SignUpComponent,

    RouterModule,

    FlexLayoutModule,

    // forms
    FormsModule,
    ReactiveFormsModule,

    // export module's
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormAnggotaComponent,
    FormPermohonanComponent,
    NodataWidgetComponent,
    HargaPupukComponent,
  ],
})
export class SharedModule {}
