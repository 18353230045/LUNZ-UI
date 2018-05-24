import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHearFromComponent } from './create-hear-from.component';

describe('CreateHearFromComponent', () => {
  let component: CreateHearFromComponent;
  let fixture: ComponentFixture<CreateHearFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHearFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHearFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
