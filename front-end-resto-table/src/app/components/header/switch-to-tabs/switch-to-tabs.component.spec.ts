import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchToTabsComponent } from './switch-to-tabs.component';

describe('SwitchToTabsComponent', () => {
  let component: SwitchToTabsComponent;
  let fixture: ComponentFixture<SwitchToTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchToTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchToTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
