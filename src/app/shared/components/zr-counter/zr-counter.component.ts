import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isUndefined, isNull } from 'util';

@Component({
  selector: 'zr-counter',
  templateUrl: './zr-counter.component.html',
  styleUrls: ['./zr-counter.component.scss']
})

export class ZrCounterComponent implements OnInit {
  @Input() value: any;
  @Input() showLeftIdentifier?: boolean = false;
  @Input() showRightIdentifier?: boolean = false;
  @Input() identifierLeft?: string;
  @Input() identifierRight?: string;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  @Input() toFixed?: number = 2;
  @Input() step?: number = 1;
  @Input() size?: string = 'md';
  @Input() iconLeft?: string;
  @Input() iconRight?: string;

  @Output() valueChange = new EventEmitter();

  constructor() { };

  ngOnInit() {
    if (this.value) {
      this.changeValue(this.value);
    };
  };

  processingValue(value: any) {
    value = value.toString();
    if (value.lastIndexOf('.') > -1) {
      value = Number(value);
      value = value.toFixed(this.toFixed + 2);
      value = value.substring(0, value.lastIndexOf('.') + this.toFixed + 1);
      return Number(value);
    } else {
      return Number(value);
    };
  };

  changeValue(value: any) {
    this.toFixed = this.toFixed < 0 ? 0 : this.toFixed;

    const currentValue = this.processingValue(value);

    if ((this.minValue || this.minValue === 0) && (this.maxValue || this.maxValue === 0)) {
      if (currentValue <= this.minValue) {
        this.value = this.minValue;
      } else if (currentValue >= this.maxValue) {
        this.value = this.maxValue;
      };
    } else if (this.minValue || this.minValue === 0) {
      if (currentValue <= this.minValue) {
        this.value = this.minValue;
      } else {
        this.value = currentValue;
      };
    } else if (this.maxValue || this.maxValue === 0) {
      if (currentValue >= this.maxValue) {
        this.value = this.maxValue;
      } else {
        this.value = currentValue;
      }
    } else {
      this.value = currentValue;
    };

    this.valueChange.emit(this.value);
  };

  blurValue(value: any) {
    if (value > 0 || value < 0) {
      this.changeValue(value);
    } else if (Number(value) === 0) {
      this.changeValue(value);
    } else {
      this.valueChange.emit(null);
    }
  };

  reduceValue() {
    this.toFixed = this.toFixed < 0 ? 0 : this.toFixed;

    if (isNaN(this.value) || isUndefined(this.value) || isNull(this.value)) {
      this.value = 0;
    };
    if (isNaN(this.step) || isUndefined(this.step) || isNull(this.step)) {
      this.step = 1;
    };
    if (this.minValue) {
      this.value -= this.step;

      if (this.value > this.minValue) {
        this.valueChange.emit(this.processingValue(this.value));
      } else {
        this.value = this.minValue;
        this.valueChange.emit(this.processingValue(this.value));
      }
    } else {
      this.value -= this.step;
      this.valueChange.emit(this.processingValue(this.value));
    };
  };

  increaseValue() {
    this.toFixed = this.toFixed < 0 ? 0 : this.toFixed;

    if (isNaN(this.value) || isUndefined(this.value) || isNull(this.value)) {
      this.value = 0;
    };
    if (isNaN(this.step) || isUndefined(this.step) || isNull(this.step)) {
      this.step = 1;
    };

    if (this.minValue && this.value < this.minValue) {
      this.value = this.minValue;
      this.valueChange.emit(this.processingValue(this.value));
      return;
    };

    if (this.maxValue) {
      this.value += this.step;

      if (this.value < this.maxValue) {
        this.valueChange.emit(this.processingValue(this.value));
      } else {
        this.value = this.maxValue;
        this.valueChange.emit(this.processingValue(this.value));
      }
    } else {
      this.value += this.step;
      this.valueChange.emit(this.processingValue(this.value));
    };
  };

};
