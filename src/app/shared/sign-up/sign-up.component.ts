import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserModel, UserRole } from 'src/models/user-model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // form
  form: FormGroup;
  listUserRole: string[] = ['DINAS_PERTANIAN', 'TOKO_PUPUK', 'KELOMPOK_TANI'];

  /**
   * konstructor
   * @param fb
   * @param authService
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignUpComponent>
  ) {}

  /**
   * init component
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      nama: new FormControl('', [Validators.required, Validators.minLength(3)]),
      alamat: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      role: new FormControl(3, [Validators.required]),
    });

    this.form.patchValue({
      nama: 'SIAMASEI',
      email: 'siamasei@gmail.com',
      password: '12345678',
      alamat: 'Desa Patampanua Kec. Matakali',
      role: UserRole.KELOMPOK_TANI,
    });
  }

  /**
   * submit form
   */
  async submitForm(): Promise<void> {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const formValue = this.form.value as UserModel;
      const model: UserModel = formValue;
      console.log(model);

      try {
        await this.authService.register(model);
      } finally {
        this.form.reset();
        this.dialogRef.close();
      }
    }
  }

  // getter
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get nama(): FormControl {
    return this.form.get('nama') as FormControl;
  }

  get alamat(): FormControl {
    return this.form.get('alamat') as FormControl;
  }

  get role(): FormControl {
    return this.form.get('role') as FormControl;
  }
}
