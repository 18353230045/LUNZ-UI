import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHearFromComponent } from './edit-hear-from.component';

describe('EditHearFromComponent', () => {
  let component: EditHearFromComponent;
  let fixture: ComponentFixture<EditHearFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHearFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHearFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
