import { HargaPupukComponent } from './../harga-pupuk/harga-pupuk.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  openDialogSignIn() {
    const dialogRef = this.dialog.open(SignInComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogSignUp() {
    this.dialog.open(SignUpComponent);
  }

  openHargaPupuk() {
    this.dialog.open(HargaPupukComponent);
  }

  ngOnInit(): void {}
}
