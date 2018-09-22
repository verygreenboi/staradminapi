import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadBankComponent } from './load-bank.component';

describe('LoadBankComponent', () => {
  let component: LoadBankComponent;
  let fixture: ComponentFixture<LoadBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
