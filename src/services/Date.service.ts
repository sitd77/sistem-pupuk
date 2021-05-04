import firebase from 'firebase';
import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class DateService {
  // const variabels
  private _listBulan: string[] = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  /**
   * konstrucutor dari service date
   */
  constructor() {}

  /**
   * inisialisasi datepicker
   */
  init(ttl?: Function, withId?: string): void {
    $(withId ? '#' + withId : '.datepicker').datepicker({
      gotoCurrent: true,
      duration: 'slow',
      dateFormat: 'dd MM yy',
      changeYear: true,
      changeMonth: true,
      autoSize: true,
      yearRange: 'c-50:c+10',
      monthNames: [...this._listBulan],
      dayNames: [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
      ],
      dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
      dayNamesMin: ['Mi', 'Se', 'Sl', 'Rb', 'Km', 'Jm', 'Sb'],
      onSelect: ttl
        ? ttl
        : (dateText, _) => {
            console.log('date selected : ', dateText);
          },
    });
  }

  /**
   * konversi datepicker ke bentuk waktu Indonesia
   * @param date
   * @returns string
   */
  public getDateFromDatepicker(date: string): string {
    var result = '';

    // parsing date
    const ar = date.split('/');
    const tanggal = ar[0];
    const bulan = ar[1];
    const tahun = ar[2];

    const bl = parseInt(bulan);
    const th = parseInt(tahun);
    const tg = parseInt(tanggal);

    result = `${tg} ${this._listBulan[bl - 1]} ${th}`;

    return result;
  }

  /**
   * dapatkan tanggal dan waktu dari timestamp
   * @param waktu
   */
  public getDateFromTimestamp(
    waktu: firebase.firestore.Timestamp,
    onlyBulan?: any
  ): string {
    let ret = '';
    const date = waktu.toDate();

    const tanggal = date.getDate().toString().padStart(2, '0');
    const bulan = onlyBulan
      ? date.getMonth().toString().padStart(2, '0')
      : this._listBulan[date.getMonth()];
    const tahun = date.getFullYear();

    ret = onlyBulan
      ? `${tanggal}-${bulan}-${tahun}`
      : `${tanggal} ${bulan} ${tahun}`;

    return ret;
  }

  /**
   * dapatkan jam dan waktu dari timestamp
   * @param waktu
   */
  public getTimeFromTimestamp(waktu: firebase.firestore.Timestamp): string {
    let ret = '';
    const date = waktu.toDate();

    const jam = date.getHours();
    const menit = date.getMinutes();

    ret = `${jam}:${menit}`;

    return ret;
  }

  /**
   * dapatkan hari dari timestamp
   * @param waktu
   */
  public getDayFromTimestamp(waktu: firebase.firestore.Timestamp): string {
    const date = waktu.toDate();
    const day = date.getDay();
    const listDay = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];
    return listDay[day];
  }
}
