import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isUndefined, isNull } from 'util';

@Component({
  selector: 'zr-counter',
  templateUrl: './zr-counter.component.html',
  styleUrls: ['./zr-counter.component.scss']
})

export class ZrCounterComponent implements OnInit {
  @Input()
  private set value(value: number) {
    this._value = Number(Number(value).toFixed(this.toFixed));
  }
  private get value(): number {
    return this._value;
  }
  @Input() showLeftIdentifier?: boolean = false;
  @Input() showRightIdentifier?: boolean = false;
  @Input() identifierLeft?: string;
  @Input() identifierRight?: string;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  @Input() toFixed?: number = 2;
  @Input() step?: number = 1;

  @Output() valueChange = new EventEmitter();

  private _value: number;

  constructor() { };

  ngOnInit() {
    if (this.value) {
      this.changeValue(this.value);
    };
  };

  changeValue(value: number) {
    const currentValue = Number(Number(value).toFixed(this.toFixed));
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

  blurValue(value: number) {
    if (value > 0 || value < 0) {
      this.changeValue(value);
    } else {
      this.valueChange.emit(null);
    }
  };

  reduceValue() {
    if (isNaN(this.value) || isUndefined(this.value) || isNull(this.value)) this.value = 0;
    if (isNaN(this.step) || isUndefined(this.step) || isNull(this.step)) this.step = 1;
    if (this.minValue) {
      if (this.value > this.minValue) {
        this.value -= this.step;
        this.valueChange.emit(Number(Number(this.value).toFixed(this.toFixed)));
      }
    } else {
      this.value -= this.step;
      this.valueChange.emit(Number(Number(this.value).toFixed(this.toFixed)));
    };
  };

  increaseValue() {
    if (isNaN(this.value) || isUndefined(this.value) || isNull(this.value)) this.value = 0;
    if (isNaN(this.step) || isUndefined(this.step) || isNull(this.step)) this.step = 1;

    if (this.minValue && this.value < this.minValue) {
      this.value = this.minValue;
      this.valueChange.emit(Number(Number(this.value).toFixed(this.toFixed)));
      return;
    };

    if (this.maxValue) {
      if (this.value < this.maxValue) {
        this.value += this.step;
        this.valueChange.emit(Number(Number(this.value).toFixed(this.toFixed)));
      }
    } else {
      this.value += this.step;
      this.valueChange.emit(Number(Number(this.value).toFixed(this.toFixed)));
    };
  };

};
