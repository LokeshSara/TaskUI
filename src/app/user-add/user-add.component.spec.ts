import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { UserAddComponent } from './user-add.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('TaskListComponent', () => {
  let component: UserAddComponent;
  let USERS;
  let router: Router;
  let mockTaskService;

  beforeEach(() => {

    USERS = [
      {UserId: 1, FirstName: 'User1', LastName: 'LN1', EmployeeId: 1, ProjectId: 1, TaskId: 1},
      {UserId: 2, FirstName: 'User2', LastName: 'LN2', EmployeeId: 1, ProjectId: 1, TaskId: 2}
    ];

    mockTaskService = jasmine.createSpyObj(['getAllUsers']);

    component = new UserAddComponent(mockTaskService, router);

  });


  describe('Get All Users', () => {

    it('should return all users', () => {

      mockTaskService.getAllUsers.and.returnValue(of(USERS));

      component.getAllUser();

      expect(component.UserList.length).toBe(2);

    });

  });
});
