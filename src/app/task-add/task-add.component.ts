import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { ITaskList } from '../task-list/ITaskList';
import { ITaskInfo } from './ITaskInfo';
import { IProject } from '../project-add/IProject';
import { IUser } from '../user-add/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  TaskInfo: ITaskList[];
  errorMessage: string;
  TaskInformation: ITaskInfo;
  _Task: string;
  _Priorty: string ;
  _StartDate: string;
  _EndDate: string;
  TaskAddStatus: boolean;
  strPriority: string;
  _parentID: number;
  ProjectInfo: IProject[];
  UserInfo: IUser[];
  _ProjectID: number;
  _UserID: number;

IsProjectNotSelected =  false;
IsTaskNameNotEntered = false;
IsEndDateNotSelected = false;
IsStartDateNotSelected = false;
IsUserNotSelected =  false;
IsDateRangeNotValid = false;

  constructor(private taskService: ApiService, private router: Router) {

   }

  ngOnInit() {
    this.priority = '0';
    this.parentId = 0;
    this.getParentTask();
    this.getAllUser();
    this.getAllProjects();
    this.userId = 0;
    this.projectId = 0;
  }

    get task(): string {return this._Task; }
    set task(value: string) { this._Task = value.trim(); }

    get priority(): string {return this._Priorty; }
    set priority(value: string) { this._Priorty = value.trim(); }


    get startDate(): string {return this._StartDate; }
    set startDate(value: string) { this._StartDate = value.trim(); }

    get endDate(): string {return this._EndDate; }
    set endDate(value: string) { this._EndDate = value.trim(); }

    get parentId(): number {return this._parentID; }
    set parentId(value: number) { this._parentID = value; }

    get projectId(): number {return this._ProjectID; }
    set projectId(value: number) { this._ProjectID = value; }

    get userId(): number {return this._UserID; }
    set userId(value: number) { this._UserID = value; }

    getAllUser(): void {
      this.taskService.getAllUsers().subscribe(
      UserInfo => {
          this.UserInfo = UserInfo;
      },
      error => this.errorMessage =  <any>error
      );
    }

    getAllProjects(): void {
      this.taskService.getAllProject().subscribe(
      projectInfo => {
          this.ProjectInfo = projectInfo;
      },
      error => this.errorMessage =  <any>error
      );
    }

    getParentTask(): void {
      this.taskService.getAllTasks().subscribe(
      TskInfo => {
          this.TaskInfo = TskInfo;
      },
      error => this.errorMessage =  <any>error
      );
    }

    validateProjectName(value) {

      if (value === undefined || value === 0 ) {
        this.IsProjectNotSelected = true;
      }      else {
        this.IsProjectNotSelected = false;
      }
    }

    validateTaskName(value) {

      if (value === undefined || value === '' ) {
        this.IsTaskNameNotEntered = true;
      }      else {
        this.IsTaskNameNotEntered = false;
      }
    }


    validateStartDate(value) {

      if (value === undefined || value === '' ) {
        this.IsStartDateNotSelected = true;
      }      else {
        this.IsStartDateNotSelected = false;
      }
    }

    validateEndDate(value) {

      if (value === undefined || value === '' ) {
        this.IsEndDateNotSelected = true;
      }      else {
        this.IsEndDateNotSelected = false;
      }
    }

    validateUser(value) {
    console.log(value);
      if (value === undefined || value === 0 ) {
        this.IsUserNotSelected = true;
      }      else {
        this.IsUserNotSelected = false;
      }
    }

    validateDateRange(startdate, enddate) {
      if (startdate > enddate) {
        this.IsDateRangeNotValid = true;
      }      else {
        this.IsDateRangeNotValid = false;
      }
    }


    AddTask(): void {

    this.validateDateRange(this.startDate, this.endDate);
    this.validateEndDate(this.endDate);
    this.validateProjectName(this.projectId);
    this.validateStartDate(this.startDate);
    this.validateTaskName(this.task);
    this.validateUser(this.userId);

if (!this.IsDateRangeNotValid && !this.IsEndDateNotSelected && !this.IsStartDateNotSelected &&
     !this.IsProjectNotSelected && !this.IsTaskNameNotEntered && !this.IsUserNotSelected
   ) {

      this.TaskInformation = {
                          ParentId: this.parentId, TaskDesc: this.task, StartDate: this.startDate,
                          EndDate: this.endDate, Priority: Number(this.priority), ProjectId: this.projectId,
                          UserId: this.userId
                        };

      const searchJson = JSON.stringify(this.TaskInformation);

      this.taskService.AddTask(searchJson).subscribe(
      TskInfo => {
          this.TaskAddStatus = TskInfo;
          this.router.navigateByUrl('/home');
      },
      error => this.errorMessage =  <any>error
      );

    }
    }

    ResetTask(): void {
      this.task = '';
      this.priority = '0';
      this.startDate = '';
      this.endDate = '';
      this.parentId = 0;
      this.projectId = 0;
      this.userId = 0;
      this.IsProjectNotSelected =  false;
      this.IsTaskNameNotEntered = false;
      this.IsEndDateNotSelected = false;
      this.IsStartDateNotSelected = false;
      this.IsUserNotSelected =  false;
      this.IsDateRangeNotValid = false;
    }

    OnPriorityChange(strPriority) {
        this.priority = strPriority;
    }

}
