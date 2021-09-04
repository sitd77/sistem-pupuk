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
      this.listData = l;
      setTimeout(() => {
        this.printReport();
        this.printReport();
      }, 1000);
    });
  }

  closeMe() {
    this.dialogRef.close();
  }

  parseReport(r: string): string {
    return r.replace('Kg ', 'Kg, ');
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
