import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge-demo',
  templateUrl: './badge-demo.component.html',
  styleUrls: ['./badge-demo.component.scss']
})

export class BadgeDemoComponent implements OnInit {
  model: any = 100;
  max: any = 99;
  badge: Boolean = false;

  constructor() { }

  ngOnInit() {
    // setTimeout(() => {
    //   this.model = 10;
    //   this.max = 20;
    // },3000);
    // setTimeout(() => {
    //   this.model = 10;
    //   this.max = 8;
    // },5000);
  }

}
