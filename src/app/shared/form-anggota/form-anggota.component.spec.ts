import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnggotaComponent } from './form-anggota.component';

describe('FormAnggotaComponent', () => {
  let component: FormAnggotaComponent;
  let fixture: ComponentFixture<FormAnggotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAnggotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnggotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
