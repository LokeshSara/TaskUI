import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { ITaskList } from '../task-list/ITaskList';
import { ITasEditInfo } from './ITaskEditInfo';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Observable, throwError} from 'rxjs';

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


  constructor(private taskService: ApiService, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.tskId = params['id'];

    });

   }

  ngOnInit() {
    this.parentId = 0;
    this.getTaskById(this.tskId);
    this.getParentTask();
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

      },
      error => this.errorMessage =  <any>error
      );
    }

    EditTask(): void {

      this.TaskInformation = {
                           TaskId: this.tskId, ParentId: this.parentId, TaskDesc: this.task, StartDate: this.startDate,
                          EndDate: this.endDate, Priority: Number(this.priority),
                        };

      const searchJson = JSON.stringify(this.TaskInformation);

      this.taskService.UpdateTask(searchJson).subscribe(
      TskInfo => {
          this.TaskAddStatus = TskInfo;
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
