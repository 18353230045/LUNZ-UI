import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zr-button',
  template: `
  <button type="button" class="btn {{bg}}" (click)="click()" 
    [disabled]="disabled" [ngClass]="{'dropdown-toggle':toggle,'m-btn--air':shadow,
    'btn-sm':size==='sm','btn-lg':size==='lg','m-btn--square':borderRadius==='square',
    'm-btn--pill':borderRadius==='pill'}">
    <i class="{{icon}}"></i>
    {{text}}
  </button>
  `
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
  @Input() shadow?: Boolean = false;      // button shadow
  @Input() toggle?: Boolean = false;

  @Output() clickEventer = new EventEmitter();

  constructor() { };

  ngOnInit() {
  };

  click() {
    this.clickEventer.emit(this.data);
  };
};
