import { PermohonanService } from './../../../services/permohonan.service';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permohonan',
  templateUrl: './permohonan.component.html',
  styleUrls: ['./permohonan.component.scss'],
})
export class PermohonanComponent implements OnInit {
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
  ngOnInit(): void {}
}
