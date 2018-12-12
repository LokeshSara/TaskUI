import { Component, OnInit } from '@angular/core';
import { apiService } from '../shared/shared.service';

@Component({
  selector: 'pm-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor( private taskService: apiService) { }

  ngOnInit() {
  }

}
