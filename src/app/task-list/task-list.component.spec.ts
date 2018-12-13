import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let TASKS;

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

    component = new TaskListComponent(mockTaskService);

  });


  describe('Get All Task', () => {

    it('should return all tasks', () => {

      mockTaskService.getAllTasks.and.returnValue(of(TASKS));

      component.getAllTask();

      expect(component.TaskInfo.length).toBe(3);

    });

  });







});
