import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pupuk-item',
  templateUrl: './pupuk-item.component.html',
  styleUrls: ['./pupuk-item.component.scss']
})
export class PupukItemComponent implements OnInit {

  @Input('value') public value: string = '100';
  @Input('pupuk') public pupuk: string = 'urea';

  constructor() { }

  ngOnInit(): void {
  }


  getImagePath(): string {
    var ret: string = 'assets/img/';
    var spupuk = this.pupuk.replace('-', '').replace(' ', '')
    ret += spupuk + '.svg'
    return ret;
  }


}
