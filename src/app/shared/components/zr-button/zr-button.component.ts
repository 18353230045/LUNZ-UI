import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zr-button',
  template: `
  <button type="button" class="btn {{size}} {{bg}} {{borderRadius}} {{shadow}}" (click)="click()" 
    [disabled]="disabled" [ngClass]="{'dropdown-toggle':toggle}">
    <i class="{{icon}}"></i>
    {{text}}
  </button>`
})

// @Component({
//   selector: 'zr-button',
//   templateUrl: './zr-button.component.html',
//   styleUrls: ['./zr-button.component.scss']
// })

export class ZrButtonComponent implements OnInit {
  @Input() text?: String = 'button';
  @Input() data?: any;
  @Input() size?: String = '';              // button size ['btn-lg'，'btn-sm']
  @Input() bg?: String = 'btn-secondary';
  @Input() disabled?: Boolean = false;
  @Input() icon?: String = '';
  @Input() borderRadius?: String = '';      // button border radius ['m-btn--square'，'m-btn--pill']
  @Input() shadow?: String = '';      // button shadow
  @Input() toggle?: Boolean = false;

  @Output() clickEventer = new EventEmitter();

  constructor() { };

  ngOnInit() {
  };

  click() {
    this.clickEventer.emit(this.data);
  };
};
