import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPembagianComponent } from './detail-pembagian.component';

describe('DetailPembagianComponent', () => {
  let component: DetailPembagianComponent;
  let fixture: ComponentFixture<DetailPembagianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPembagianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPembagianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
