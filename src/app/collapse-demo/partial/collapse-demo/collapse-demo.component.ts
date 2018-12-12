import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-demo',
  templateUrl: './collapse-demo.component.html',
  styleUrls: ['./collapse-demo.component.scss']
})

export class CollapseDemoComponent implements OnInit {
  panels: Array<any> = [];
  panels2: Array<any> = [];
  constructor() { }

  ngOnInit() {
    this.panels = [
      {
        active: true,
        name: 'This is panel header 1',
        disabled: false
      },
      {
        active: false,
        disabled: false,
        name: 'This is panel header 2'
      },
      {
        active: false,
        disabled: false,
        name: 'This is panel header 3'
      }
    ];
    this.panels2 = [
      {
        active: true,
        name: 'This is panel header 1',
        disabled: false
      },
      {
        active: false,
        disabled: false,
        name: 'This is panel header 2'
      },
      {
        active: false,
        disabled: true,
        name: 'This is panel header 3'
      }
    ];
  }

}
