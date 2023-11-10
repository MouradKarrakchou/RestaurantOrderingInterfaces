import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationStatusComponent } from './preparation-status.component';

describe('PreparationStatusComponent', () => {
  let component: PreparationStatusComponent;
  let fixture: ComponentFixture<PreparationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
