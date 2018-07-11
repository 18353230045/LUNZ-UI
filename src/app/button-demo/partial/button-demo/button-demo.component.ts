import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-demo',
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent implements OnInit {
  data: any;
  demo1: any;
  demo2: any;
  demo3: any;
  demo4: any;
  demo5: any;
  demo6: any;
  demo7: any;
  demo8: any;
  demo9: any;
  demo10: any;
  demo11: any;
  demo12: any;
  constructor() { };

  ngOnInit() {
    this.data = {
      id: '01',
      name: '张三',
      sex: '男',
      age: '22',
      address: 'qigndao'
    };
  };

  click1(event: any) {
    this.demo1 = JSON.stringify(event);
  };
  click2(event: any) {
    this.demo2 = JSON.stringify(event);
  };
  click3(event: any) {
    this.demo3 = JSON.stringify(event);
  };
  click4(event: any) {
    this.demo4 = JSON.stringify(event);
  };
  click5(event: any) {
    this.demo5 = JSON.stringify(event);
  };
  click6(event: any) {
    this.demo6 = JSON.stringify(event);
  };
  click7(event: any) {
    this.demo7 = JSON.stringify(event);
  };
  click8(event: any) {
    this.demo8 = JSON.stringify(event);
  };
  click9(event: any) {
    this.demo9 = JSON.stringify(event);
  };
  click10(event: any) {
    this.demo10 = JSON.stringify(event);
  };
  click11(event: any) {
    this.demo11 = JSON.stringify(event);
  };
  click12(event: any) {
    this.demo12 = JSON.stringify(event);
  };

};
