import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { ITaskList } from '../task-list/ITaskList';
import { ITasEditInfo } from './ITaskEditInfo';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import { IProject } from '../project-add/IProject';
import { IUser } from '../user-add/IUser';

@Component({
  selector: 'pm-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  TaskInfo: ITaskList[];
  errorMessage: string;
  TaskInformation: ITasEditInfo;
  _Task: string;
  _Priorty: string ;
  _parentID: number;
  _StartDate: string;
  _EndDate: string;
  TaskAddStatus: boolean;
  strPriority: string;
  tskId: number;
  _selectedParentTask: string;
  ProjectInfo: IProject[];
  UserInfo: IUser[];
  _ProjectID: number;
  _UserID: number;

  constructor(private taskService: ApiService, private route: ActivatedRoute, private router: Router) {

    this.route.params.subscribe(params => {
      this.tskId = params['id'];

    });

   }

  ngOnInit() {
    this.parentId = 0;
    this.getTaskById(this.tskId);
    this.getParentTask();
    this.getAllUser();
    this.getAllProjects();
  }

    get task(): string {return this._Task; }
    set task(value: string) { this._Task = value.trim(); }

    get priority(): string {return this._Priorty; }
    set priority(value: string) { this._Priorty = value; }

    get parentId(): number {return this._parentID; }
    set parentId(value: number) { this._parentID = value; }

    get startDate(): string {return this._StartDate; }
    set startDate(value: string) { this._StartDate = value.trim(); }

    get endDate(): string {return this._EndDate; }
    set endDate(value: string) { this._EndDate = value.trim(); }

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

    getTaskById(id): void {
      this.taskService.GetTaskById(id).subscribe(
      TskInfo => {
          this.TaskInformation = TskInfo;

          this.task = this.TaskInformation['taskDesc'];
          this.priority = this.TaskInformation['priority'];
          this.parentId = this.TaskInformation['parentId'];
          this.startDate = this.TaskInformation['startDate'];
          this.endDate = this.TaskInformation['endDate'];
          this.projectId = this.TaskInformation['projectId'];
          this.userId = this.TaskInformation['userId'];

      },
      error => this.errorMessage =  <any>error
      );
    }

    EditTask(): void {

      this.TaskInformation = {
                           TaskId: this.tskId, ParentId: this.parentId, TaskDesc: this.task, StartDate: this.startDate,
                          EndDate: this.endDate, Priority: Number(this.priority), ProjectId: this.projectId,
                          UserId: this.userId
                        };

      const searchJson = JSON.stringify(this.TaskInformation);

      this.taskService.UpdateTask(searchJson).subscribe(
      TskInfo => {
          this.TaskAddStatus = TskInfo;
          this.router.navigateByUrl('/home');
      },
      error => this.errorMessage =  <any>error
      );
    }



    ResetTask(): void {
      this.getTaskById(this.tskId);
    }

    OnPriorityChange(strPriority) {

        this.priority = strPriority;
    }


}
