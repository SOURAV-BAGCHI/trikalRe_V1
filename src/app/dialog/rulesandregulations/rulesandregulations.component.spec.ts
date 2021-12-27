import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesandregulationsComponent } from './rulesandregulations.component';

describe('RulesandregulationsComponent', () => {
  let component: RulesandregulationsComponent;
  let fixture: ComponentFixture<RulesandregulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesandregulationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesandregulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
