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
  _ParentTask: string;
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

    this.priority = '15;';
   }

  ngOnInit() {
    this.getTaskById(this.tskId);
    this.getParentTask();
  }

    get task(): string {return this._Task; }
    set task(value: string) { this._Task = value.trim(); }

    get priority(): string {return this._Priorty; }
    set priority(value: string) { this._Priorty = value.trim(); }

    get parentTask(): string {return this._ParentTask; }
    set parentTask(value: string) { this._ParentTask = value.trim(); }

    get startDate(): string {return this._StartDate; }
    set startDate(value: string) { this._StartDate = value.trim(); }

    get endDate(): string {return this._EndDate; }
    set endDate(value: string) { this._EndDate = value.trim(); }

    get selectedParentTask(): string {return this._selectedParentTask; }
    set selectedParentTask(value: string) { this._selectedParentTask = value.trim(); }

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

      },
      error => this.errorMessage =  <any>error
      );
    }

    EditTask(): void {

      this.TaskInformation = {
                           TaskId: this.tskId, ParentId: Number(this.selectedParentTask), TaskDesc: this.task, StartDate: this.startDate,
                          EndDate: this.endDate, Priority: Number(this.priority),
                        };

      const searchJson = JSON.stringify(this.TaskInformation);

      this.taskService.AddTask(searchJson).subscribe(
      TskInfo => {
          this.TaskAddStatus = TskInfo;
      },
      error => this.errorMessage =  <any>error
      );
    }



    ResetTask(): void {
      this.task = '';
      this.priority = '15';
      this.parentTask = '';
      this.startDate = 'mm/dd/yyyy';
      this.endDate = 'mm/dd/yyyy';
    }

    OnPriorityChange(strPriority) {
        this.priority = strPriority;
    }


}
