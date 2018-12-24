import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ProjectAddComponent } from './project-add.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';


describe('Project Add Component', () => {
  let component: ProjectAddComponent;
  let Projects;
  let router: Router;
  let mockTaskService;

  beforeEach(() => {

    Projects = [
      {ProjectId: 1,  ProjectDesc: 'Parent1', ManagerId: 1,
        startDate: '2018-01-01T00:00:00', endDate: '2018-01-01T00:00:00', priority: 1}
    ];

    mockTaskService = jasmine.createSpyObj(['getAllProject']);

    component = new ProjectAddComponent(mockTaskService);

  });


  describe('Get All Projects', () => {

    it('should return all Projects', () => {

      mockTaskService.getAllProject.and.returnValue(of(Projects));

      component.getAllProjects();

      expect(component.ProjectList.length).toBe(1);

    });

  });
});
