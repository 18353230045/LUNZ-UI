import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearFromsComponent } from './hear-froms.component';

describe('HearFromsComponent', () => {
  let component: HearFromsComponent;
  let fixture: ComponentFixture<HearFromsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HearFromsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearFromsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
