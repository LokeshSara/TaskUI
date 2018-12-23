import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { IUser } from '../user-add/IUser';
import { IProject } from './IProject';

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
  ManagerInfo: IUser[];
  ProjectList: IProject[];
  _SearchKey: string;

  constructor(private taskService: ApiService) { }

  ngOnInit() {
  }


  get project(): string {return this._Project; }
  set project(value: string) { this._Project = value.trim(); }

  get priority(): string {return this._Priorty; }
  set priority(value: string) { this._Priorty = value.trim(); }


  get startDate(): string {return this._StartDate; }
  set startDate(value: string) { this._StartDate = value.trim(); }

  get endDate(): string {return this._EndDate; }
  set endDate(value: string) { this._EndDate = value.trim(); }

  get managerId(): number {return this._ManagerId; }
  set managerId(value: number) { this._ManagerId = value; }

  get searchKey(): string {return this._SearchKey; }
  set searchKey(value: string) { this._SearchKey = value.trim(); }


    OnPriorityChange(strPriority) {
        this.priority = strPriority;
    }

Add() {

}

Reset() {

}


Edit(id){

}

Delete(id){

}

}
