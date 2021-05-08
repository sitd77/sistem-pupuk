import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPermohonanComponent } from './form-permohonan.component';

describe('FormPermohonanComponent', () => {
  let component: FormPermohonanComponent;
  let fixture: ComponentFixture<FormPermohonanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPermohonanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPermohonanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
