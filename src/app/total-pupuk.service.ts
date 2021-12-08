import { SwalService } from 'src/services/swal.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface StatusPupuk {
  id: string,
  total: number,
  sisa: number,
  keluar: number
}


interface ReportStatusI {
  pupuk: string,
  keluar: number,
}

@Injectable({
  providedIn: 'root'
})
export class TotalPupukService {

  constructor(
    private firestore: AngularFirestore,
    private dialog: SwalService,
  ) { 
    this.$listStatusPupuk = this.firestore.collection(this.collectionsName).valueChanges({idField: 'id'}) as Observable<StatusPupuk[]>;
  }

  private collectionsName: string = 'status-pupuk';
  public $listStatusPupuk: Observable<StatusPupuk[]>;



  public async updateStatusPupuk(old: StatusPupuk, formValue: any) : Promise<void>{
    var docId = old.id
    try {
      this.dialog.loading('Mengupdate data pupuk ...')
      await this.firestore.collection(this.collectionsName).doc(docId).set({...formValue})
      this.dialog.toastsuccess('Data pupuk berhasil diupdate.')
    } catch (error) {
      this.dialog.error('Terjadi kesalahan saat mengupdate data pupuk.')
      console.log(error)
    }
  }


  public async batchDataToUpdates(report: string) : Promise<void> {
    // const report : string = ' urea_mt1 : 5 Kg urea_mt2 : 3 Kg za_mt1 : 3 Kg za_mt2 : 3 Kg npk_mt1 : 5 Kg npk_mt2 : 5 Kg organik_mt1 : 7 Kg organik_mt2 : 13 Kg'
    const parsedReport: string = report.trim().toLowerCase()
    if(parsedReport.length > 4) {
      const listReport = parsedReport.split('kg')
      var listReportStatus : ReportStatusI[] = [];
      listReport.forEach(r => {
        const parsedR = r.trim()

        if(parsedR.length > 3) {
          const ar = parsedR.split(':')
          const arname = ar[0].trim().split('_')
          const pupukName = arname[0].trim()
          const keluar = parseInt(ar[1].trim())
          const kStatusReport : ReportStatusI = {
            keluar: keluar,
            pupuk: pupukName,
          }
          listReportStatus.push(kStatusReport)
        }
  
      }) 

      this.dialog.loading('Memperbarui stok pupuk ...')
      await Promise.all(listReportStatus.map(async (rs: ReportStatusI) => {
        await this.updateSisaPupuk(rs.pupuk, rs.keluar)
      },),);
      this.dialog.toastsuccess('Pembaruan data selesai.')
    }
  }


  public async updateSisaPupuk(pupuk: string, keluar: number) : Promise<void> {
    var q = pupuk.toLowerCase().replace('-', '').replace(' ', '')

    const req = await this.firestore.collection(this.collectionsName).doc(q).get().toPromise()
    if(req.exists) {
      const data = req.data() as StatusPupuk
      data.id = q

      const keluarLalu = data.keluar
      const total = data.total
      const keluarBaru = keluar + keluarLalu
      const sisaBaru = total - keluarBaru

      await this.firestore.collection(this.collectionsName).doc(q).update({
        keluar: keluarBaru,
        sisa: sisaBaru
      })
    }
  }
}
