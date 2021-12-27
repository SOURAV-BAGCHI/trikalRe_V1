import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBookingComponent } from './manual-booking.component';

describe('ManualBookingComponent', () => {
  let component: ManualBookingComponent;
  let fixture: ComponentFixture<ManualBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
