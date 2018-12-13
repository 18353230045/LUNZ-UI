import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-demo',
  templateUrl: './rate-demo.component.html',
  styleUrls: ['./rate-demo.component.scss']
})

export class RateDemoComponent implements OnInit {
  value: Number = 2;

  constructor() { }

  ngOnInit() { }

  rateChange(event: any) {
    this.change = event;
  }

  change(event: any) {
    this.value = event;
  }

}
