import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'qr-widget',
  templateUrl: './qr-widget.component.html',
  styleUrls: ['./qr-widget.component.css']
})
export class QrWidgetComponent implements OnInit {

  @Input()
  btcAddress: string;

  constructor() { }

  ngOnInit() {
  }

}
