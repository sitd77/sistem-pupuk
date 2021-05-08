/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HargaPupukComponent } from './harga-pupuk.component';

describe('HargaPupukComponent', () => {
  let component: HargaPupukComponent;
  let fixture: ComponentFixture<HargaPupukComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HargaPupukComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HargaPupukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
