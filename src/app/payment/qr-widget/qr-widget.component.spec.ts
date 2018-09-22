import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrWidgetComponent } from './qr-widget.component';

describe('QrWidgetComponent', () => {
  let component: QrWidgetComponent;
  let fixture: ComponentFixture<QrWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
