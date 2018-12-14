import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-demo',
  templateUrl: './rate-demo.component.html',
  styleUrls: ['./rate-demo.component.scss']
})

export class RateDemoComponent implements OnInit {
  value1: number;
  value2: number;
  value3: number;
  value4: number;

  constructor() { }

  ngOnInit() { }

}
