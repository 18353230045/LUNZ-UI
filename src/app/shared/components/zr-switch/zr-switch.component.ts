import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zr-switch',
  templateUrl: './zr-switch.component.html',
  styleUrls: ['./zr-switch.component.scss']
})

export class ZrSwitchComponent implements OnInit {

  @Input() icon: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: string = '';               // lg sm
  @Input() state: string = 'primary';       // success、warning、info、danger、accent、primary
  @Input() outline: boolean = false;
  @Input() checked?: boolean;

  @Output() checkedChange = new EventEmitter<any>();
  name: string;

  constructor() {
    this.name = String(Math.random() * 10);
  };

  ngOnInit() {
  };

  handle(event: any) {
    this.checkedChange.emit(event.target.checked);
  };
};
