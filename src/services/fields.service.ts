import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  /**
   * konstructor dari class
   */
  constructor() {}

  /**
   * daftarkan event pada fields
   */
  initFields(): void {
    // update fields pada saat ada datanya
    const fields = document.querySelectorAll('.form__group');
    fields.forEach((field) => {
      const fieldInput = field.querySelector(
        '.form__group__field'
      ) as HTMLInputElement;
      fieldInput.addEventListener('keypress', () => {
        this.updateClassFields();
      });
      fieldInput.addEventListener('change', () => {
        this.updateClassFields();
      });
      fieldInput.addEventListener('blur', () => {
        this.updateClassFields();
      });
    });
  }

  /**
   * update class dari field
   */
  public updateClassFields(): void {
    const fields = document.querySelectorAll('.form__group');
    fields.forEach((field) => {
      const fieldInput = field.querySelector(
        '.form__group__field'
      ) as HTMLInputElement;
      if (fieldInput.value.length > 0) {
        field.classList.add('active');
      } else {
        field.classList.remove('active');
      }
    });
  }

  public updateDatepicker(control: FormControl): void {
    const fields = document.querySelectorAll('.form__group');
    fields.forEach((field) => {
      const fieldInput = field.querySelector(
        '.form__group__field'
      ) as HTMLInputElement;
      if (fieldInput.classList.contains('datepicker')) {
        fieldInput.addEventListener('change', () => {
          control.patchValue(fieldInput.value);
        });
        fieldInput.addEventListener('keypress', () => {
          control.patchValue(fieldInput.value);
        });
        fieldInput.addEventListener('blur', () => {
          control.patchValue(fieldInput.value);
        });
      }
    });
  }

  /**
   * apakah form error
   * @param field
   */
  isError(form: FormGroup, field: string): boolean {
    if (
      (form.get(field).hasError('required') ||
        form.get(field).hasError('minlength') ||
        form.get(field).hasError('maxlength') ||
        form.get(field).hasError('pattern') ||
        form.get(field).hasError('min') ||
        form.get(field).hasError('max') ||
        form.get(field).hasError('email')) &&
      (form.get(field).dirty || form.get(field).touched)
    ) {
      return true;
    }
    return false;
  }

  /**
   * dapatkan control
   * @param except
   * @returns
   */
  getControls(form: FormGroup, except?: string[]): string[] {
    let controls: string[] = [];

    Object.keys(form.controls).forEach((control) => {
      if (except) {
        let ada = false;
        for (let i = 0; i < except.length; i++) {
          const current = except[i];
          if (current == control) {
            ada = true;
            break;
          }
        }
        if (!ada) {
          controls.push(control);
        }
      } else {
        controls.push(control);
      }
    });

    return controls;
  }

  /**
   * dapatkan daftar fields dari object
   * @param except
   * @returns
   */
  getListKey(object: Object, except?: string[]): string[] {
    let controls: string[] = [];

    Object.keys(object).forEach((control) => {
      if (except) {
        let ada = false;
        for (let i = 0; i < except.length; i++) {
          const current = except[i];
          if (current == control) {
            ada = true;
            break;
          }
        }
        if (!ada) {
          controls.push(control);
        }
      } else {
        controls.push(control);
      }
    });

    return controls;
  }

  getLabelFromName(name): string {
    let label = '';
    const ar = name.split('_');
    ar.forEach((kata) => {
      label += this.getCapital(kata) + ' ';
    });
    label = label.trim();
    return label;
  }

  getCapital(word: string): string {
    return (
      word[0].toUpperCase() + word.substr(1, word.length - 1).toLowerCase()
    );
  }

  /**
   * set data form dengan object
   * @param form
   * @param name
   * @param value
   */
  setFormFieldsWithObject(form: FormGroup, name: string, value: Object): void {
    form.get(name).patchValue(value);
  }
}
