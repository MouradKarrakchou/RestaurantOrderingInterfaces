import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReceiptComponent } from './client-receipt.component';

describe('ClientReceiptComponent', () => {
  let component: ClientReceiptComponent;
  let fixture: ComponentFixture<ClientReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
