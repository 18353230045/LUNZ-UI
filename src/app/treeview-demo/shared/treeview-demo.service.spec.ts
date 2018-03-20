import { TestBed, inject } from '@angular/core/testing';

import { TreeviewDemoService } from './treeview-demo.service';

describe('TreeviewDemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeviewDemoService]
    });
  });

  it('should be created', inject([TreeviewDemoService], (service: TreeviewDemoService) => {
    expect(service).toBeTruthy();
  }));
});
