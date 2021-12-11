import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AronyoneerComponent } from './aronyoneer.component';

describe('AronyoneerComponent', () => {
  let component: AronyoneerComponent;
  let fixture: ComponentFixture<AronyoneerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AronyoneerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AronyoneerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
