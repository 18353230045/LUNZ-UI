import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps-demo',
  templateUrl: './steps-demo.component.html',
  styleUrls: ['./steps-demo.component.scss']
})

export class StepsDemoComponent implements OnInit {
  active1: number = 1;
  active2: number = 1;
  active3: number = 1;
  active4: number = 1;
  constructor() { };

  ngOnInit() {
  };

  click1() {
    this.active1 += 1;
    if (this.active1 > 3) {
      this.active1 = 0;
    };
  };
  click2() {
    this.active2 += 1;
    if (this.active2 > 3) {
      this.active2 = 0;
    };
  };
  click3() {
    this.active3 += 1;
    if (this.active3 > 3) {
      this.active3 = 0;
    };
  };
  click4() {
    this.active4 += 1;
    if (this.active4 > 3) {
      this.active4 = 0;
    };
  };

};
