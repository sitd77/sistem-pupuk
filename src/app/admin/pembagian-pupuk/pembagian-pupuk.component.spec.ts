import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PembagianPupukComponent } from './pembagian-pupuk.component';

describe('PembagianPupukComponent', () => {
  let component: PembagianPupukComponent;
  let fixture: ComponentFixture<PembagianPupukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PembagianPupukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PembagianPupukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
