import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
import { RouterModule } from '@angular/router';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { TotalPupukService } from './total-pupuk.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    RouterModule,
    SharedModule,

    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // firestore
    AngularFirestoreModule,
    // fireauth
    AngularFireAuthModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    TotalPupukService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
