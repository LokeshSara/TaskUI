import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;




  beforeEach(() => {
    component = new TaskListComponent();
  });


/**
 *
 */

  it('should get all Tasks', () => {
    expect(component.getAllTask().length).toBeGreaterThan(0);
  });




});
