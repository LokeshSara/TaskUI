import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { IUser } from '../user-add/IUser';
import { IProject } from './IProject';
import { ISearchInfo } from './ISearchInfo';

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
IsProjectNamePresent: boolean;

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
  set startDate(value: string) { this._StartDate = value.trim(); }

  get endDate(): string {return this._EndDate; }
  set endDate(value: string) { this._EndDate = value.trim(); }

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

validate(): Boolean {




  if (this.startDate >= this.endDate) {
    this.dateIsInvalidValid = true;
  } else {
    this.dateIsInvalidValid = false;
  }

  if (this.project == null || this.project === '') {
    this.IsProjectNamePresent = true;
  } else {
    this.IsProjectNamePresent = false;
  }

  return this.dateIsInvalidValid && this.IsProjectNamePresent;

}

    AddUpdate() {
      this.IsProjectNamePresent = false;
      this.dateIsInvalidValid = false;

    if (!this.validate()) {
      return; }

      this.ProjectInfo = {
         ProjectId: this.projectId, ProjectDesc: this.project, StartDate: this.startDate,
         EndDate: this.endDate, Priority: this.priority, ManagerId: this.managerId
      };

    const projectinfoJson = JSON.stringify(this.ProjectInfo);

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
            this.startDate = '';
            this.endDate = '';
            this.priority = '0';
            this.managerId = 0;
        },
        error => this.errorMessage =  <any>error
        );
    }
}

Reset() {
  if (this.projectId === 0 ) {
    this.project = '';
    this.startDate = '';
    this.endDate = '';
    this.priority = '0';
    this.managerId = 0;
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
