import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zr-tag',
  templateUrl: './zr-tag.component.html',
  styleUrls: ['./zr-tag.component.scss']
})
export class ZrTagComponent implements OnInit {
  @Input() size?: string = 'middle';
  // @Input() borderColor?: string = 'rgba(64,158,255,.2)';
  // @Input() backgroundColor?: string = 'rgba(64,158,255,.1)';
  // @Input() color?: string = 'rgb(64, 158, 255)';
  // @Input() borderColor?: string = 'rgb(113, 106, 202,.2)';
  // @Input() backgroundColor?: string = 'rgb(113, 106, 202,.1)';
  @Input() type?: string = 'gray';
  @Input() text: string;
  @Input() closeTag: boolean = false;
  @Input() tagData: any;

  @Output() handle = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor() { };

  ngOnInit() {
  };

  clickTag() {
    this.handle.emit(this);
  };

};
