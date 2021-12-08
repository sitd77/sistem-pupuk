import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { StatusPupuk, TotalPupukService } from 'src/app/total-pupuk.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  isLoading:boolean = true;
  isToko: boolean = false;
  ourData: StatusPupuk[] = [];

  constructor(
    private service: TotalPupukService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((user) => {
      if(user) {
        // toko
        this.isToko = user.role == 2;
      }
      else {
        this.isToko = false;
      }
    })
    this.service.$listStatusPupuk.subscribe(data => {
      this.ourData = data
      this.isLoading = false;
    })
  }

}
