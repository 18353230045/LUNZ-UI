import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSelectionComponent } from './select-selection.component';

describe('SelectSelectionComponent', () => {
  let component: SelectSelectionComponent;
  let fixture: ComponentFixture<SelectSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
