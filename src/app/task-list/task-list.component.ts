import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { ITaskList } from './ITaskList';

@Component({
  selector: 'pm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  TaskInfo: ITaskList[];
  errorMessage: string;

  constructor( private taskService: ApiService) {

   }

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

}
