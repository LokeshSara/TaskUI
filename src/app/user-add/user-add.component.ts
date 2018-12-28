import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/shared.service';
import { IUser } from './IUser';
import { ISearchInfo } from './ISearchInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  _FistName: string;
  _LastName: string;
  _EmployeeId: number;
  _SearchKey: string;
  _AddButtonText: string;
  UserList: IUser[];
  UserInfo: IUser;
  UpdateStatus: boolean;
  errorMessage: string;
  _UserId: number;
  searchInfo: ISearchInfo;
  IsFirstNameNotEntered =  false;
  IsLastNameNotEntered = false;
  IsEmployeeIDNotEntered = false;

  constructor(private taskService: ApiService, private router: Router) { }

  ngOnInit() {
    this.addbuttontext = 'Add';
    this.getAllUser();
    this.userId = 0;
  }

  get userId(): number {return this._UserId; }
  set userId(value: number) { this._UserId = value; }

  get firstName(): string {return this._FistName; }
  set firstName(value: string) { this._FistName = value.trim(); }

  get lastName(): string {return this._LastName; }
  set lastName(value: string) { this._LastName = value.trim(); }

  get searchKey(): string {return this._SearchKey; }
  set searchKey(value: string) { this._SearchKey = value.trim(); }

  get employeeId(): number {return this._EmployeeId; }
  set employeeId(value: number) { this._EmployeeId = value; }

  get addbuttontext(): string {return this._AddButtonText; }
  set addbuttontext(value: string) { this._AddButtonText = value.trim(); }

  getAllUser(): void {
    this.taskService.getAllUsers().subscribe(
    UserInfo => {
        this.UserList = UserInfo;
    },
    error => this.errorMessage =  <any>error
    );
  }

  getUserById(id): void {
    this.taskService.GetUserById(id).subscribe(
    userInfo => {
        this.UserInfo = userInfo;
        this.userId = this.UserInfo['userId'];
        this.firstName = this.UserInfo['firstName'];
        this.lastName = this.UserInfo['lastName'];
        this.employeeId = this.UserInfo['employeeId'];
    },
    error => this.errorMessage =  <any>error
    );
  }

  validateEmployeeId(value) {
    console.log(value);
    if (value === undefined || value === '' ) {
      this.IsEmployeeIDNotEntered = true;
    }      else {
      this.IsEmployeeIDNotEntered = false;
    }
  }

  validateFirstName(value) {

    if (value === undefined || value === ''  ) {
      this.IsFirstNameNotEntered = true;
    }      else {
      this.IsFirstNameNotEntered = false;
    }
  }

  validateLastName(value) {

    if (value === undefined || value === '' ) {
      this.IsLastNameNotEntered = true;
    }      else {
      this.IsLastNameNotEntered = false;
    }
  }


AddUpdate() {


this.validateEmployeeId(this.employeeId);
this.validateFirstName(this.firstName);
this.validateLastName(this.lastName);

if (!this.IsLastNameNotEntered && !this.IsFirstNameNotEntered && !this.IsEmployeeIDNotEntered){

      this.UserInfo = {
         FirstName: this.firstName, LastName: this.lastName, EmployeeId: this.employeeId, UserId: this.userId
      };

    const userinfoJson = JSON.stringify(this.UserInfo);

    if (this.userId === 0) {
      this.taskService.AddUser(userinfoJson).subscribe(
        TskInfo => {
        this.UpdateStatus = TskInfo;
        this.getAllUser();
        this.Reset();
        },
        error => this.errorMessage =  <any>error
        );
    } else {
      this.taskService.UpdateUser(userinfoJson).subscribe(
        TskInfo => {
            this.UpdateStatus = TskInfo;
            this.getAllUser();
            this.firstName = '';
            this.lastName = '';
            this.employeeId = undefined;
            this.addbuttontext = 'Add';
            this.userId = 0;
        },
        error => this.errorMessage =  <any>error
        );
    }

  }


}

Reset() {
  if (this.userId === 0 ) {
    this.firstName = '';
    this.lastName = '';
    this.employeeId = undefined;
    this.IsFirstNameNotEntered =  false;
    this.IsLastNameNotEntered = false;
    this.IsEmployeeIDNotEntered = false;
  } else {
    this.getUserById(this.userId);
  }
}

Edit(id) {
  this.addbuttontext = 'Update';
  this.getUserById(id);
}

Delete(id): void {
  this.DeleteUser(id);
}


DeleteUser(id): void {
  this.taskService.DeleteUser(id).subscribe(
  updateInfo => {
      this.UpdateStatus = updateInfo;
      this.getAllUser();
  },
  error => this.errorMessage =  <any>error
  );
}

Search(): void {
  this.searchInfo = {
                      searchKey: this.searchKey
                    };

  const searchJson = JSON.stringify(this.searchInfo);

  this.taskService.searchUser(searchJson).subscribe(
  userList => {
      this.UserList = userList;
  },
  error => this.errorMessage =  <any>error
  );
}



}
