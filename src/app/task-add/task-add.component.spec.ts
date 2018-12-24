import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TaskAddComponent } from './task-add.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('TaskListComponent', () => {
  let component: TaskAddComponent;
  let TASKS;
  let router: Router;
  let mockTaskService;

  beforeEach(() => {

    TASKS = [
      {taskId: 1, parentId: 1, parentDesc: 'Parent1', taskDesc: 'taskDesc1',
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 1},
        {taskId: 2, parentId: 1, parentDesc: 'Parent1', taskDesc: 'taskDesc2',
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 8},
        {taskId: 3, parentId: 1, parentDesc: 'Parent1', taskDesc: 'taskDesc3',
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 2},
    ];

    mockTaskService = jasmine.createSpyObj(['getAllTasks']);

    component = new TaskAddComponent(mockTaskService, router);

  });


  describe('Get All Parent Task', () => {

    it('should return all parent Task', () => {

      mockTaskService.getAllTasks.and.returnValue(of(TASKS));

      component.getParentTask();

      expect(component.TaskInfo.length).toBe(3);

    });

  });
});
