import { TotalPupukService, StatusPupuk } from './../total-pupuk.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumlah-pupuk',
  templateUrl: './jumlah-pupuk.component.html',
  styleUrls: ['./jumlah-pupuk.component.scss']
})
export class JumlahPupukComponent implements OnInit {

  isLoading: boolean = true;
  isFormOpen: boolean = false;
  selectedItem: StatusPupuk = null;
  public ourData: StatusPupuk[] = [];

  form = new FormGroup({
    total: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    keluar: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    sisa: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
  })

  constructor(
    private service: TotalPupukService
  ) { }

  ngOnInit(): void {
    this.service.$listStatusPupuk.subscribe(data => {
      this.isLoading = false
      this.ourData = data
    })
  }


  getCurrentSisa() : number {

    if(this.selectedItem != null) {
      var formValue = this.form.value
      var total = formValue.total
      var keluar = formValue.keluar
      var sisa = total - keluar
      return sisa
    }

    return 0
  }


  isNumber(key) : boolean {

    var tolower = key.toLowerCase()

    try {
      parseInt(tolower)  
      return true
    } catch (error) {
      return false
    }
  }


  onKeyPress(e) : void {

    if(this.isNumber(e.key)) {
      var sisaControl = this.form.controls['sisa'] as FormControl
      var sisa = this.getCurrentSisa()
      sisaControl.patchValue(sisa)
      sisaControl.patchValue(sisa)
    }

  }


  editItem(item: StatusPupuk) : void {
    this.selectedItem = item;
    this.form.patchValue({...item})
    this.isFormOpen = true;
  }


  async submitEdit() : Promise<void> {


    await this.service.updateStatusPupuk(this.selectedItem, this.form.value)

    this.isFormOpen = false;
    this.selectedItem = null;
  }
}
