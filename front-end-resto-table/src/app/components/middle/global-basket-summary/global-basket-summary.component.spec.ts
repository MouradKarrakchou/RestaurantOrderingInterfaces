import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalBasketSummaryComponent } from './global-basket-summary.component';

describe('GlobalBasketSummaryComponent', () => {
  let component: GlobalBasketSummaryComponent;
  let fixture: ComponentFixture<GlobalBasketSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalBasketSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalBasketSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
