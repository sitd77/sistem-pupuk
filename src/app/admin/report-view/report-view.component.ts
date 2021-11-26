import { DateService } from './../../../services/Date.service';
import { Subscription } from 'rxjs';
import { PermohonanService } from 'src/services/permohonan.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { TableExport } from 'tableexport';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss'],
})
export class ReportViewComponent implements OnInit {
  sub: Subscription;
  listData = [];
  table = null;

  constructor(
    public dateService: DateService,
    public service: PermohonanService,
    public dialogRef: MatDialogRef<ReportViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const kelompokId = this.data['kelompok_id'];
    this.service.getListReport(kelompokId).then((l) => {
      this.listData = this.parseListForData(l)
      
      setTimeout(() => {
        this.printReport();
        this.printReport();
      }, 1000);
    });
  }

  parseListForData(list: any) : any{
    let newlist: any = []

    // step 1 : ambil id anggota dan tanggal
    let listanggota: any = []
    list.forEach((d:any)=> {
      const id = d.anggota_id
      const tanggal = this.dateService.getDateFromTimestamp( d.tanggal)
      let found = false
      listanggota.forEach((a:any) => {
        if(a.id == id && a.tanggal == tanggal) {
          found= true
        }
      })

      if(!found) {
        listanggota.push({
          nama:d.anggota,
          nik:d.nik,
          id: id,
          tanggal:tanggal,
        })
      }
    })

    // step 2 : ambil data pupuk
    listanggota.forEach((a: any) => {
      let za = 0
      let npk = 0
      let sp36 = 0
      let organik = 0
      let urea = 0
      list.forEach((d: any) => {
        const id = d.anggota_id
        const tanggal = this.dateService.getDateFromTimestamp( d.tanggal)
        if(a.tanggal == tanggal && a.id == id) {
          let ar = this.getArrayPengambilan(d.pengambilan)
          urea = this.ambilJumlahPupuk(ar, 'urea')
          npk = this.ambilJumlahPupuk(ar, 'npk')
          sp36 = this.ambilJumlahPupuk(ar, 'sp36')
          za = this.ambilJumlahPupuk(ar, 'za')
          organik = this.ambilJumlahPupuk(ar, 'organik')
        }
      })
      newlist.push({
        ...a,
        urea:urea,
        npk:npk,
        za:za,
        sp36:sp36,
        organik:organik
      })
    })

    

    return newlist
  }

  getArrayPengambilan(pengambilanString: string) {
    let ar = pengambilanString.split('Kg')
    let result = []
    ar.forEach(a => {
      if(a.includes(':')) {
        let replacedData = a.trim().replace(' ', '')
        result.push(replacedData)
      }
    })
    return result
  }

  ambilJumlahPupuk(data: Array<string>, pupuk: string = 'urea') : number {
    let jumlah : number = 0

    data.forEach(d => {
      let ar = d.split('_')
      if(ar[0].toLowerCase() == pupuk.toLowerCase()) {
        let ax = ar[1].split(': ')
        let j = parseInt(ax[1])
        jumlah += j
      }
    })

    return jumlah

  }

  closeMe() {
    this.dialogRef.close();
  }

  parsePengambilan(r: string): string {
    let replacedText = r.replace('Kg', '~')
    return replacedText;
  }

  printReport() {
    if (this.table) {
      this.table.remove();
    }
    this.table = new TableExport(document.getElementById('datareport'), {

      headers: true, // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true, // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ['xlsx'], // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
      filename: 'Export - Report Kelompok Tani ' + this.data['nama'], // (id, String), filename for the downloaded file, (default: 'id')
      bootstrap: false, // (Boolean), style buttons using bootstrap, (default: true)
      exportButtons: true, // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: 'bottom', // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: null, // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      trimWhitespace: true, // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
      RTL: false, // (Boolean), set direction of the worksheet to right-to-left (default: false)
      sheetname: 'Kelompok Tani ' + this.data['nama'], // (id, String), sheet name for the exported spreadsheet, (default: 'id')
    });
  }
}
