import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodataWidgetComponent } from './nodata-widget.component';

describe('NodataWidgetComponent', () => {
  let component: NodataWidgetComponent;
  let fixture: ComponentFixture<NodataWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodataWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodataWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
