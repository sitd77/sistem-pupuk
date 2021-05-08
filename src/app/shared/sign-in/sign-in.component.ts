import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  // form
  form: FormGroup;

  /**
   * konstructor
   * @param fb
   * @param authService
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignInComponent>
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
    });

    this.form.patchValue({
      email: 'dinas@gmail.com',
      password: '12345678',
    });
  }

  /**
   * submit form
   */
  async submitForm(): Promise<void> {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const formValue = this.form.value;
      const email = formValue['email'];
      const password = formValue['password'];

      await this.authService.login(email, password);
      this.dialogRef.close();
    }
  }

  // getter
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
}
