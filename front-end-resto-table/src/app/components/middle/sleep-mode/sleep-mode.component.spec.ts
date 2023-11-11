import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepModeComponent } from './sleep-mode.component';

describe('SleepModeComponent', () => {
  let component: SleepModeComponent;
  let fixture: ComponentFixture<SleepModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SleepModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
