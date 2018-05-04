import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})

export class ProgressComponent implements OnInit {
  @Input() progress: any;
  @Input() type?: String = 'line';
  @Input() lineHeight?: Number = 6;
  @Input() textInside?: String = 'outside';
  @Input() backGround?: String = '#409EFF';
  @Input() textShow?: Boolean = true;
  @Input() width?: Number = 126;
  @Input() status?: any;

  constructor() { };

  ngOnInit() {
  };

  setLineHeight() {
    if (this.textInside === 'inside') {
      if (this.lineHeight <= 6) {
        return `20px`;
      } else {
        return `${this.lineHeight}px`;
      }
    } else {
      return `${this.lineHeight}px`;
    }
  };

  setBackGround() {
    if (this.progress === 100) {
      return `#67C23A`;
    } else if (this.backGround === '#409EFF') {
      return `#409EFF`;
    } else {
      return this.backGround;
    }
  };

  setWidth() {
    if (this.width <= 126) {
      return '126px';
    } else {
      return `${this.width}px`;
    }
  };

  setCircleProgress() {
    return `${299.08 - this.progress * (299.08 / 100)}px`;
  };

  setStrokeColor() {
    if (this.progress === 100) {
      return `#67C23A`;
    } else if (this.status === 'exception') {
      return `#FF4949`;
    } else if (this.backGround !== '#409EFF') {
      return this.backGround;
    } else {
      return `#409EFF`;
    }
  };
};
