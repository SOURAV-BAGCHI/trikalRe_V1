import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArponComponent } from './arpon.component';

describe('ArponComponent', () => {
  let component: ArponComponent;
  let fixture: ComponentFixture<ArponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
