import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { ITaskList } from './ITaskList';
import {ISearchOption} from './Isearchoptions';
import { Router } from '@angular/router';


@Component({
  selector: 'pm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  TaskInfo: ITaskList[];
  SearchInfo: ISearchOption;

  errorMessage: string;
  _taskDesc: string ;
  _parentTask: string;
  _PriorityFrom: number;
  _PriorityTo: number;
  _StartDate: string;
  _EndDate: string;
  deleteStatus: boolean;

  constructor( private taskService: ApiService, private router: Router) {

   }


    get taskDesc(): string {return this._taskDesc; }
    set taskDesc(value: string) { this._taskDesc = value.trim(); }

    get parentTask(): string {return this._parentTask; }
    set parentTask(value: string) { this._parentTask = value; }

    get priorityFrom(): number {return this._PriorityFrom; }
    set priorityFrom(value: number) { this._PriorityFrom = value; }

    get priorityTo(): number {return this._PriorityTo; }
    set priorityTo(value: number) { this._PriorityTo = value; }

    get startDate(): string {return this._StartDate; }
    set startDate(value: string) { this._StartDate = value.trim(); }

    get endDate(): string {return this._EndDate; }
    set endDate(value: string) { this._EndDate = value.trim(); }



  ngOnInit() {

    this.getAllTask();
  }

  getAllTask(): void {
    this.taskService.getAllTasks().subscribe(
    TskInfo => {
        this.TaskInfo = TskInfo;
    },
    error => this.errorMessage =  <any>error
    );
  }

  SearchTask(): void {
    this.SearchInfo = {
                        ParentDesc: this.parentTask, TaskDesc: this.taskDesc, StartDate: this.startDate,
                        EndDate: this.endDate, PriorityMax: this.priorityTo,
                        PriorityMin: this._PriorityFrom
                      };

    const searchJson = JSON.stringify(this.SearchInfo);

    this.taskService.searchTask(searchJson).subscribe(
    TskInfo => {
        this.TaskInfo = TskInfo;
    },
    error => this.errorMessage =  <any>error
    );
  }

    searchClick(): void {
      this.SearchTask();
    }

    onEditClick(tskid): void {
      this.router.navigateByUrl('/edit/' + tskid);
    }

    DeleteTask(taskid): void {
      this.taskService.DeleteTask(taskid).subscribe(
      TskInfo => {
          this.deleteStatus = TskInfo;
      },
      error => this.errorMessage =  <any>error
      );
    }

    OnDeleteClick(tskid): void {

      this.DeleteTask(tskid);
      this.SearchTask();
    }

}
