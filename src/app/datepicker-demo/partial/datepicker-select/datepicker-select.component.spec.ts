import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerSelectComponent } from './datepicker-select.component';

describe('DatepickerSelectComponent', () => {
  let component: DatepickerSelectComponent;
  let fixture: ComponentFixture<DatepickerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
