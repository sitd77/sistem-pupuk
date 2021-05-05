import { UserModel } from './../../../models/user-model';
import { AuthService } from 'src/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  // var's
  listUserTipe: string[] = [
    'DINAS PERTANIAN',
    'DISTRIBUTOR PUPUK',
    'KELOMPOK TANI',
  ];
  sub: Subscription;
  currentUser: UserModel;

  /**
   * konstructor component
   * @param authService
   */
  constructor(
    public authService: AuthService // service auth
  ) {}

  /**
   * init comp
   */
  ngOnInit(): void {
    this.sub = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  /**
   * lepaskan memory
   */
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
