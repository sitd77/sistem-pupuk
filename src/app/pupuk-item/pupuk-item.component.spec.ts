import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupukItemComponent } from './pupuk-item.component';

describe('PupukItemComponent', () => {
  let component: PupukItemComponent;
  let fixture: ComponentFixture<PupukItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PupukItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PupukItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
