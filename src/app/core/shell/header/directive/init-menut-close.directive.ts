import { Directive, AfterViewInit, ElementRef } from '@angular/core';

declare const mLayout: any;

@Directive({
  selector: '[initMenutClose]'
})
export class InitMenutCloseDirective implements AfterViewInit {
  private _loaded = false;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {

    if (!this._loaded) {
      mLayout.initAside();
      this.elementRef.nativeElement.click();
      this._loaded = true;
    }
  }

}
