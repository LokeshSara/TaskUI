import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TaskAddComponent } from './task-add.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('TaskListComponent', () => {
  let component: TaskAddComponent;
  let TASKS;
  let Task;
  let router: Router;
  let mockTaskService;
  let mockRoute;
  let Projects;
  let USERS;

  beforeEach(() => {

    Projects = [
      {ProjectId: 1,  ProjectDesc: 'Parent1', ManagerId: 1,
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 1}
    ];

    USERS = [
      {UserId: 1, FirstName: 'User1', LastName: 'LN1', EmployeeId: 1, ProjectId: 1, TaskId: 1},
      {UserId: 2, FirstName: 'User2', LastName: 'LN2', EmployeeId: 1, ProjectId: 1, TaskId: 2}
    ];

    TASKS = [
      {taskId: 1, parentId: 1, parentDesc: 'Parent1', taskDesc: 'taskDesc1',
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 1},
        {taskId: 2, parentId: 1, parentDesc: 'Parent1', taskDesc: 'taskDesc2',
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 8},
        {taskId: 3, parentId: 1, parentDesc: 'Parent1', taskDesc: 'taskDesc3',
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 2},
    ];

    Task = {taskId: 1, parentId: 1, parentDesc: 'Parent1', taskDesc: 'taskDesc1',
    startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 1};

    mockTaskService = jasmine.createSpyObj(['getAllTasks', 'getAllProject', 'getAllUsers', 'AddTask', 'navigateByUrl']);
    mockRoute = jasmine.createSpyObj(['navigateByUrl']);

    component = new TaskAddComponent(mockTaskService, mockRoute);

  });

  describe('Get All Projects', () => {

    it('should return all Projects', () => {

      mockTaskService.getAllProject.and.returnValue(of(Projects));

      component.getAllProjects();

      expect(component.ProjectInfo.length).toBe(1);

    });

  });

  describe('Get All users', () => {

    it('should return all users', () => {

      mockTaskService.getAllUsers.and.returnValue(of(USERS));

      component.getAllUser();

      expect(component.UserInfo.length).toBe(2);

    });

  });

  describe('Get All Parent Task', () => {

    it('should return all parent Task', () => {

      mockTaskService.getAllTasks.and.returnValue(of(TASKS));

      component.getParentTask();

      expect(component.TaskInfo.length).toBe(3);

    });

  });

  // describe('All Task', () => {

  //   it('should Add Task', () => {

  //     mockTaskService.AddTask.and.returnValue(of(true));
  //     mockTaskService.navigateByUrl.and.returnValue(of('\home'));
  //     component.TaskInformation = Task;
  //     component.AddTask();

  //     expect(component.TaskAddStatus).toBe(true);

  //   });
  // });


});
