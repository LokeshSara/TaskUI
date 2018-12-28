import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ProjectAddComponent } from './project-add.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';


describe('Project Add Component', () => {
  let component: ProjectAddComponent;
  let Projects;
  let Project;
  let ProjectAdd;
  let ProjectUpdate;
  let USERS;
  let router: Router;
  let mockTaskService;

  beforeEach(() => {

    Projects = [
      {ProjectId: 1,  ProjectDesc: 'Parent1', ManagerId: 1,
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 1}
    ];

    Project =  { ProjectId: 1,  ProjectDesc: 'Parent1', ManagerId: 1,
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 1};

        ProjectAdd =  { ProjectId: 0,  ProjectDesc: 'Parent1', ManagerId: 1,
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 1};

        ProjectUpdate =  { ProjectId: 1,  ProjectDesc: 'Parent1', ManagerId: 1,
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 1};

    USERS = [
      {UserId: 1, FirstName: 'User1', LastName: 'LN1', EmployeeId: 1, ProjectId: 1, TaskId: 1},
      {UserId: 2, FirstName: 'User2', LastName: 'LN2', EmployeeId: 1, ProjectId: 1, TaskId: 2}
    ];

    mockTaskService = jasmine.createSpyObj(['getAllProject', 'getAllUsers',
       'GetProjectById', 'AddProject', 'UpdateProject', 'DeleteProject']);

    component = new ProjectAddComponent(mockTaskService);

  });


  describe('Get All Projects', () => {

    it('should return all Projects', () => {

      mockTaskService.getAllProject.and.returnValue(of(Projects));

      component.getAllProjects();

      expect(component.ProjectList.length).toBe(1);

    });

  });

  describe('Get All users', () => {

    it('should return all users', () => {

      mockTaskService.getAllUsers.and.returnValue(of(USERS));

      component.getAllUser();

      expect(component.ManagerInfo.length).toBe(2);

    });

  });

  describe('Get project by Id', () => {

    it('should return project by Id', () => {

      mockTaskService.GetProjectById.and.returnValue(of(Project));

      component.getProjectById(1);

      expect(component.ProjectInfo.ProjectDesc).toBe('Parent1');

    });

  });

  describe('add project', () => {

    it('should add project ', () => {

      mockTaskService.AddProject.and.returnValue(of(true));
      mockTaskService.getAllProject.and.returnValue(of(Projects));

      component. projectId = 0;
      component.ProjectInfo = ProjectAdd;
      component.managerId = 1;
      component.project = 'Test';
      component.startDate = '01/01/2015';
      component.endDate = '01/02/2015';
      component.AddUpdate();


      expect(component.UpdateStatus).toBe(true);

    });

  });


  describe('update project', () => {

    it('should update project ', () => {

      mockTaskService.UpdateProject.and.returnValue(of(true));
      mockTaskService.getAllProject.and.returnValue(of(Projects));

      component. projectId = 1;
      component.ProjectInfo = ProjectUpdate;
      component.managerId = 1;
      component.project = 'Test';
      component.startDate = '01/01/2015';
      component.endDate = '01/02/2015';
      component.AddUpdate();

      expect(component.UpdateStatus).toBe(true);

    });

  });

  describe('delete project', () => {

    it('should delete project ', () => {

      mockTaskService.DeleteProject.and.returnValue(of(true));
      mockTaskService.getAllProject.and.returnValue(of(Projects));

      component.Delete(1);

      expect(component.UpdateStatus).toBe(true);

    });

  });

});
