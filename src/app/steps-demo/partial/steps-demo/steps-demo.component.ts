import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steps-demo',
  templateUrl: './steps-demo.component.html',
  styleUrls: ['./steps-demo.component.scss']
})

export class StepsDemoComponent implements OnInit {
  steps1: any[] = [];
  steps2: any[] = [];
  steps3: any[] = [];
  steps4: any[] = [];
  stepActive1: number = 1;
  stepActive2: number = 2;
  stepActive3: number = 3;
  stepActive4: number = 4;
  icon: any[] = ['la la-child', 'la la-vine', 'la la-hand-paper-o', 'la la-user-times'];

  constructor() { }

  ngOnInit() {
    this.steps1 = [
      { text: '步骤一' },
      { text: '步骤二' },
      { text: '步骤三' },
      { text: '步骤四' }
    ];
    this.steps2 = [
      { text: '步骤一', describe: '这是描述性文字这是描述性文字' },
      { text: '步骤二', describe: '这是描述性文字' },
      { text: '步骤三', describe: '这是描述性文字' },
      { text: '步骤四', describe: '这是描述性文字' }
    ];
    this.steps3 = [
      { text: '步骤一' },
      { text: '步骤二' },
      { text: '步骤三' },
      { text: '步骤四' }
    ];
    this.steps4 = [
      { text: '步骤一' },
      { text: '步骤二' },
      { text: '步骤三' },
      { text: '步骤四' }
    ];
  }

  step1() {
    this.stepActive1 += 1;
    if (this.stepActive1 > this.steps1.length) {
      this.stepActive1 = 0;
    }
  }
  step2() {
    this.stepActive2 += 1;
    if (this.stepActive2 > this.steps2.length) {
      this.stepActive2 = 0;
    }
  }
  step3() {
    this.stepActive3 += 1;
    if (this.stepActive3 > this.steps3.length) {
      this.stepActive3 = 0;
    }
  }
  step4() {
    this.stepActive4 += 1;
    if (this.stepActive4 > this.steps4.length) {
      this.stepActive4 = 0;
    }
  }

}
