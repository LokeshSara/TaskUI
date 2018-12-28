import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { IUser } from '../user-add/IUser';
import { IProject } from './IProject';
import { ISearchInfo } from './ISearchInfo';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'pm-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {
  _Project: string;
  _Priorty: string ;
  _StartDate: string;
  _EndDate: string;
  _ManagerId: number;
  ProjectList: IProject[];
  _SearchKey: string;
  ManagerInfo: IUser[];
  errorMessage: string;
  ProjectInfo: IProject;
_ProjectId: number;
UpdateStatus: boolean;
searchInfo: ISearchInfo;
_AddButtonText: string;
dateIsInvalidValid: boolean;
IsProjectNameNotPresent: boolean;
IsManagerNotSelected =  false;
IsProjectNameNotEntered = false;
IsEndDateNotSelected = false;
IsStartDateNotSelected = false;
IsDateRangeNotValid = false;

  constructor(private taskService: ApiService) { }

  ngOnInit() {
    this.priority = '0';
    this.addbuttontext = 'Add';
    this.getAllProjects();
    this.getAllUser();
    this.managerId = 0;
    this.projectId = 0;
    this.dateIsInvalidValid = false;
  }


  get project(): string {return this._Project; }
  set project(value: string) { this._Project = value.trim(); }

  get priority(): string {return this._Priorty; }
  set priority(value: string) { this._Priorty = value; }


  get startDate(): string {return this._StartDate; }
  set startDate(value: string) { this._StartDate = value; }

  get endDate(): string {return this._EndDate; }
  set endDate(value: string) { this._EndDate = value; }

  get managerId(): number {return this._ManagerId; }
  set managerId(value: number) { this._ManagerId = value; }

  get searchKey(): string {return this._SearchKey; }
  set searchKey(value: string) { this._SearchKey = value.trim(); }

  get projectId(): number {return this._ProjectId; }
  set projectId(value: number) { this._ProjectId = value; }

  get addbuttontext(): string {return this._AddButtonText; }
  set addbuttontext(value: string) { this._AddButtonText = value.trim(); }

  getAllUser(): void {
    this.taskService.getAllUsers().subscribe(
    UserInfo => {
        this.ManagerInfo = UserInfo;
    },
    error => this.errorMessage =  <any>error
    );
  }

  getAllProjects(): void {
    this.taskService.getAllProject().subscribe(
    projectInfo => {
        this.ProjectList = projectInfo;
    },
    error => this.errorMessage =  <any>error
    );
  }

  getProjectById(id): void {
    this.taskService.GetProjectById(id).subscribe(
    projectInfo => {
        this.ProjectInfo = projectInfo;
        this.projectId = this.ProjectInfo['projectId'];
        this.project = this.ProjectInfo['projectDesc'];
        this.startDate = this.ProjectInfo['startDate'];
        this.endDate = this.ProjectInfo['endDate'];
        this.priority = this.ProjectInfo['priority'];
        this.managerId = this.ProjectInfo['managerId'];
    },
    error => this.errorMessage =  <any>error
    );
  }


    OnPriorityChange(strPriority) {
        this.priority = strPriority;
    }

    validateManager(value) {
      if (value === 0 ) {
        this.IsManagerNotSelected = true;
      }      else {
        this.IsManagerNotSelected = false;
      }
    }

    validateProjectName(value) {

      if (value === undefined || value === '' ) {
        this.IsProjectNameNotEntered = true;
      }      else {
        this.IsProjectNameNotEntered = false;
      }
    }

    validateStartDate(value) {
      console.log(value);
      if (value === undefined || value === '' ) {
        this.IsStartDateNotSelected = true;
      }      else {
        this.IsStartDateNotSelected = false;
      }
    }

    validateEndDate(value) {
      console.log(value);
      if (value === undefined || value === '' ) {
        this.IsEndDateNotSelected = true;
      }      else {
        this.IsEndDateNotSelected = false;
      }
    }

    validateDateRange(startdate, enddate) {
      if (startdate > enddate) {
        this.IsDateRangeNotValid = true;
      }      else {
        this.IsDateRangeNotValid = false;
      }
    }

    AddUpdate() {

      this.validateManager(this.managerId);
      this.validateProjectName(this.project);
      this.validateStartDate (this.startDate);
      this.validateEndDate(this.endDate);

      if (!this.IsEndDateNotSelected && !this.IsStartDateNotSelected) {
        this.validateDateRange(this.startDate, this.endDate);
      }

      this.ProjectInfo = {
        ProjectId: this.projectId, ProjectDesc: this.project, StartDate: this.startDate,
        EndDate: this.endDate, Priority: this.priority, ManagerId: this.managerId
     };

      const projectinfoJson = JSON.stringify(this.ProjectInfo);

      if (!this.IsManagerNotSelected && !this.IsProjectNameNotEntered
                      && !this.IsStartDateNotSelected && !this.IsEndDateNotSelected
                      && !this.IsDateRangeNotValid) {
        if (this.projectId === 0) {
          this.taskService.AddProject(projectinfoJson).subscribe(
            projectInfo => {
            this.UpdateStatus = projectInfo;
            this.getAllProjects();
            this.Reset();
            },
            error => this.errorMessage =  <any>error
            );
        } else {
          this.taskService.UpdateProject(projectinfoJson).subscribe(
            TskInfo => {
                this.UpdateStatus = TskInfo;
                this.getAllProjects();
                this.addbuttontext = 'Add';
                this.projectId = 0;
                this.project = '';
                this.startDate = undefined;
                this.endDate = undefined;
                this.priority = '0';
                this.managerId = 0;
            },
            error => this.errorMessage =  <any>error
            );
        }
      }

}

Reset() {
  if (this.projectId === 0 ) {
    this.dateIsInvalidValid = false;
    this.project = '';
    this.startDate = undefined;
    this.endDate = undefined;
    this.priority = '0';
    this.managerId = 0;
    this.IsManagerNotSelected =  false;
    this.IsProjectNameNotEntered = false;
    this.IsEndDateNotSelected = false;
    this.IsStartDateNotSelected = false;
    this.IsDateRangeNotValid = false;
  } else {
    this.getProjectById(this.projectId);
  }
}


Edit(id) {
  this.addbuttontext = 'Update';
  this.getProjectById(id);
}

Delete(id) {
  this.DeleteProject(id);
}

DeleteProject(id): void {
  this.taskService.DeleteProject(id).subscribe(
  updateInfo => {
      this.UpdateStatus = updateInfo;
      this.getAllProjects();
  },
  error => this.errorMessage =  <any>error
  );
}

onSearchChange(): void {
  console.log(this.searchKey);
  this.searchInfo = {
                      searchKey: this.searchKey
                    };

  const searchJson = JSON.stringify(this.searchInfo);

  this.taskService.searchProject(searchJson).subscribe(
  projList => {
      this.ProjectList = projList;
  },
  error => this.errorMessage =  <any>error
  );
}

}
