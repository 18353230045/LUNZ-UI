import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zr-counter',
  templateUrl: './zr-counter.component.html',
  styleUrls: ['./zr-counter.component.scss']
})

export class ZrCounterComponent implements OnInit {
  reduceDisabled?: boolean = false;
  increaseDisabled?: boolean = false;

  @Input()
  private set value(value: number) {
    this._value = value ? Number(Number(value).toFixed(this.toFixed)) : null;
  }
  private get value(): number {
    return this._value;
  }
  @Input() showLeftIdentifier?: boolean = false;
  @Input() showRightIdentifier?: boolean = false;
  @Input() identifierLeft?: string;
  @Input() identifierRight?: string;
  @Input() step?: number = 1;
  @Input() minValue?: number;
  @Input() maxValue?: number;
  @Input() toFixed?: number = 2;

  @Output() valueChange = new EventEmitter();

  private _value: number;

  constructor() { };

  ngOnInit() {
    if (this.value) {
      this.changeValue(this.value).then(() => {
        this.disabledButton(this.value);
      });
    };
  };

  // tslint:disable-next-line:use-life-cycle-interface
  // ngOnChanges(changes: SimpleChanges) {
  //   let currentValue: number;
  //   // tslint:disable-next-line:forin
  //   for (const propName in changes) {
  //     const chng = changes[propName];
  //     currentValue = chng.currentValue;
  //   };
  //   this.disabledButton(currentValue);
  // };

  changeValue(value: number) {
    return new Promise((resolve) => {
      const currentValue = Number(Number(value).toFixed(this.toFixed));
      if (this.minValue && this.maxValue) {
        if (currentValue <= this.minValue) {
          this.value = this.minValue;
        } else if (currentValue >= this.maxValue) {
          this.value = this.maxValue;
        };
      } else if (this.minValue) {
        if (currentValue <= this.minValue) {
          this.value = this.minValue;
        } else {
          this.value = currentValue;
        };
      } else if (this.maxValue) {
        if (currentValue >= this.maxValue) {
          this.value = this.maxValue;
        } else {
          this.value = currentValue;
        }
      } else {
        this.value = currentValue;
      };

      this.valueChange.emit(this.value);
      this.disabledButton(this.value);
      resolve();
    });
  };

  blurValue(value: number) {
    if (value > 0 || value < 0) {
      this.changeValue(value);
    }
  };

  reduceValue() {
    this.value = Number(this.value);
    if (this.minValue) {
      if (this.value > this.minValue) {
        this.value -= this.step;
        this.valueChange.emit(Number(Number(this.value).toFixed(this.toFixed)));
      }
    } else {
      this.value -= this.step;
      this.valueChange.emit(Number(Number(this.value).toFixed(this.toFixed)));
    };
    this.disabledButton(this.value);
  };

  increaseValue() {
    this.value = Number(this.value);
    if (this.maxValue) {
      if (this.value < this.maxValue) {
        this.value += this.step;
        this.valueChange.emit(Number(Number(this.value).toFixed(this.toFixed)));
      }
    } else {
      this.value += this.step;
      this.valueChange.emit(Number(Number(this.value).toFixed(this.toFixed)));
    };
    this.disabledButton(this.value);
  };

  disabledButton(value: number) {
    return new Promise((resolve) => {
      if (this.minValue && value <= this.minValue) {
        this.reduceDisabled = true;
      } else {
        this.reduceDisabled = false;
      };

      if (this.maxValue && value >= this.maxValue) {
        this.increaseDisabled = true;
      } else {
        this.increaseDisabled = false;
      };
      resolve();
    });
  };

};
