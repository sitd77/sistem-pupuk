import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-harga-pupuk',
  templateUrl: './harga-pupuk.component.html',
  styleUrls: ['./harga-pupuk.component.scss'],
})
export class HargaPupukComponent implements OnInit {
  displayedColumns: string[] = ['jenis', 'perkg', 'perkarung'];

  dataPupuk: IHargaPupuk[] = [
    {
      pupuk: 'UREA',
      perkg: '2.250',
      perkarung: '112.500',
    },
    {
      pupuk: 'ZA',
      perkg: '1.700',
      perkarung: '85.000',
    },
    {
      pupuk: 'SP-36',
      perkg: '2.400',
      perkarung: '120.000',
    },
    {
      pupuk: 'NPK PHONSKA',
      perkg: '2.300',
      perkarung: '115.000',
    },
    {
      pupuk: 'PETROGANIK',
      perkg: '800',
      perkarung: '32.000',
    },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<IHargaPupuk> = new MatTableDataSource(
    this.dataPupuk
  );

  constructor() {}

  ngOnInit() {}
}

interface IHargaPupuk {
  pupuk: string;
  perkg: string;
  perkarung: string;
}
