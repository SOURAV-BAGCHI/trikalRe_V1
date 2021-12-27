import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSummeryDialogComponent } from './booking-summery-dialog.component';

describe('BookingSummeryDialogComponent', () => {
  let component: BookingSummeryDialogComponent;
  let fixture: ComponentFixture<BookingSummeryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingSummeryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSummeryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
