import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SignUpComponent } from 'src/app/shared/sign-up/sign-up.component';
import { UserRole, UserModel } from 'src/models/user-model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  // form
  form: FormGroup;
  listUserRole: string[] = ['DINAS_PERTANIAN', 'TOKO_PUPUK', 'KELOMPOK_TANI'];

  //  provate
  private currentModel: UserModel;
  private sub: Subscription;

  /**
   * konstructor
   * @param fb
   * @param authService
   */
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

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
    this.sub = this.authService.currentUser.subscribe((user) => {
      this.currentModel = user;
      this.form.patchValue(this.currentModel);
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

      await this.authService.update(this.currentModel, model);
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
