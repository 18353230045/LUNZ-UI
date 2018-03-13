import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeviewDemoComponent } from './treeview-demo.component';

describe('TreeviewDemoComponent', () => {
  let component: TreeviewDemoComponent;
  let fixture: ComponentFixture<TreeviewDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeviewDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeviewDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
