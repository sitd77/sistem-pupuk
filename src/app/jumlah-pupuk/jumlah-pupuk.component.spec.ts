import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JumlahPupukComponent } from './jumlah-pupuk.component';

describe('JumlahPupukComponent', () => {
  let component: JumlahPupukComponent;
  let fixture: ComponentFixture<JumlahPupukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JumlahPupukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JumlahPupukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
