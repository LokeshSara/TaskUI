import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { ITaskList } from '../task-list/ITaskList';
import { ITaskInfo } from './ITaskInfo';

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

  constructor(private taskService: ApiService) {

   }

  ngOnInit() {
    this.priority = '15';
    this.parentId = 0;
    this.getParentTask();
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

    getParentTask(): void {
      this.taskService.getAllTasks().subscribe(
      TskInfo => {
          this.TaskInfo = TskInfo;
      },
      error => this.errorMessage =  <any>error
      );
    }

    AddTask(): void {

      this.TaskInformation = {
                          ParentId: this.parentId, TaskDesc: this.task, StartDate: this.startDate,
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
      this.startDate = '';
      this.endDate = '';
      this.parentId = 0;
    }

    OnPriorityChange(strPriority) {
        this.priority = strPriority;
    }

}
