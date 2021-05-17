import { IPermohonan, IResultDetail } from './../../../models/permohonan-model';
import { FormGroup } from '@angular/forms';
import { PermohonanService } from 'src/services/permohonan.service';
import { DistribusiPupukModel } from 'src/models/permohonan-model';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-detail-pembagian',
  templateUrl: './detail-pembagian.component.html',
  styleUrls: ['./detail-pembagian.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ transform: 'translateY(0)', opacity: 1.0 })),
      state('false', style({ transform: 'translateY(-200%)', opacity: 0.0 })),
      transition('false <=> true', [animate(400)]),
    ]),
  ],
})
export class DetailPembagianComponent implements OnInit, OnChanges {
  // property binding
  @Input('permohonan') permohonan: IPermohonan;
  @Input('model') model: DistribusiPupukModel;
  @Input('open') open: boolean = false;
  @Output('onClosed') onClosed: EventEmitter<void> = new EventEmitter();
  @Output('onUpdated') onUpdated: EventEmitter<IResultDetail> =
    new EventEmitter<IResultDetail>();

  // forms
  newModel: DistribusiPupukModel;

  /**
   * label format untuk slider
   * @param value
   * @returns
   */
  formatLabel(value: number) {
    return value + 'kg';
  }

  /**
   * constructor dari component
   * @param service
   */
  constructor(
    private service: PermohonanService // service untuk distribusi pupuk model
  ) {}

  /**
   * saat property binding berubah
   */
  ngOnChanges(): void {
    if (this.model != null) {
      setTimeout(() => {
        this.newModel = new DistribusiPupukModel();
        this.newModel.anggota_id = this.model.anggota_id;
        this.newModel.id = this.model.id;
        this.newModel.anggota = { ...this.model.anggota };
        this.newModel.urea_mt1 = { ...this.model.urea_mt1 };
        this.newModel.urea_mt2 = { ...this.model.urea_mt2 };
        this.newModel.urea_mt3 = { ...this.model.urea_mt3 };
        this.newModel.sp36_mt1 = { ...this.model.sp36_mt1 };
        this.newModel.sp36_mt2 = { ...this.model.sp36_mt2 };
        this.newModel.sp36_mt3 = { ...this.model.sp36_mt3 };
        this.newModel.za_mt1 = { ...this.model.za_mt1 };
        this.newModel.za_mt2 = { ...this.model.za_mt2 };
        this.newModel.za_mt3 = { ...this.model.za_mt3 };
        this.newModel.npk_mt1 = { ...this.model.npk_mt1 };
        this.newModel.npk_mt2 = { ...this.model.npk_mt2 };
        this.newModel.npk_mt3 = { ...this.model.npk_mt3 };
        this.newModel.organik_mt1 = { ...this.model.organik_mt1 };
        this.newModel.organik_mt2 = { ...this.model.organik_mt2 };
        this.newModel.organik_mt3 = { ...this.model.organik_mt3 };
      }, 100);
    }
  }

  /**
   * page init
   */
  ngOnInit(): void {
    if (this.model == null || this.permohonan == null) {
      throw new Error('model <DistribusiPupukModel> belum diset.');
    }
  }

  /**
   * submit form detail pembagian stok pupuk
   */
  async submitForm(): Promise<void> {
    this.onUpdated.emit({
      distribusi: this.newModel,
      permohonan: this.permohonan,
    } as IResultDetail);
    setTimeout(() => {
      this.closeMe();
    }, 100);
  }

  /**
   * saat form ditutup
   */
  closeMe(): void {
    this.onClosed.emit();
    this.open = false;
    this.model = null;
    this.permohonan = null;
  }
}
