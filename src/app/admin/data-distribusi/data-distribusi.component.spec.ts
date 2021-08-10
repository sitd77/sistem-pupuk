/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DataDistribusiComponent } from './data-distribusi.component';

describe('DataDistribusiComponent', () => {
  let component: DataDistribusiComponent;
  let fixture: ComponentFixture<DataDistribusiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDistribusiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDistribusiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
