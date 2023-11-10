import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralBasketComponent } from './central-basket.component';

describe('CentralBasketComponent', () => {
  let component: CentralBasketComponent;
  let fixture: ComponentFixture<CentralBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentralBasketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
