import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ITaskList} from '../task-list/ITaskList';
import { HttpHeaders } from '@angular/common/http';
import { IUser } from '../user-add/IUser';
import { IProject } from '../project-add/IProject';

@Injectable({
    providedIn: 'root'
})
export class ApiService {



  //private weatherUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';
    private taskapiUrl = 'http://localhost:54913/api/task';
    private userapiUrl = 'http://localhost:54913/api/user';
    private projectapiUrl = 'http://localhost:54913/api/project';

    // private taskapiUrl = 'http://suchi-pc/TaskApi/api/task';
    //  private userapiUrl = 'http://suchi-pc/TaskApi/api/user';
    //   private projectapiUrl = 'http://suchi-pc/TaskApi/api/project';

      // private taskapiUrl = 'http://localhost/TaskApi/api/task';
      // private userapiUrl = 'http://localhost/TaskApi/api/user';
      //  private projectapiUrl = 'http://localhost/TaskApi/api/project';

    /**
     *
     */
    constructor(private http: HttpClient) {

    }

    /**
     * Task CRUD Information
     */

    getAllTasks(): Observable<ITaskList[]> {
       return this.http.get<ITaskList[]>(this.taskapiUrl).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
    }

      searchTask(searchOption): Observable<ITaskList[]> {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };

        return this.http.post<ITaskList[]>(this.taskapiUrl + '/search', searchOption, httpOptions).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

      AddTask(task): Observable<boolean> {


        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };

        return this.http.post<boolean>(this.taskapiUrl + '/add', task, httpOptions).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

      UpdateTask(task): Observable<boolean> {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };

        return this.http.post<boolean>(this.taskapiUrl + '/update', task, httpOptions).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
      }

      DeleteTask(id): Observable<boolean> {
        return this.http.delete<boolean>(this.taskapiUrl + '/delete/' + id).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
      }

      GetTaskById(id): Observable<ITaskList> {
        return this.http.get<ITaskList>(this.taskapiUrl + '/' + id).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
      }


     /**
     * User CRUD Information
     */

    getAllUsers(): Observable<IUser[]> {
      return this.http.get<IUser[]>(this.userapiUrl).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
      );
   }

     searchUser(searchOption): Observable<IUser[]> {

       const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type':  'application/json'
         })
       };

       return this.http.post<IUser[]>(this.userapiUrl + '/search', searchOption, httpOptions).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
   }

     AddUser(user): Observable<boolean> {


       const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type':  'application/json'
         })
       };

       return this.http.post<boolean>(this.userapiUrl + '/add', user, httpOptions).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
   }

     UpdateUser(user): Observable<boolean> {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

       return this.http.post<boolean>(this.userapiUrl + '/update', user, httpOptions).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
     }

     DeleteUser(id): Observable<boolean> {
       return this.http.delete<boolean>(this.userapiUrl + '/delete/' + id).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
     }

     GetUserById(id): Observable<IUser> {
       return this.http.get<IUser>(this.userapiUrl + '/' + id).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
     }

     /**
     * Project CRUD Information
     */

    getAllProject(): Observable<IProject[]> {
      return this.http.get<IProject[]>(this.projectapiUrl).pipe(
          tap(data => console.log('All: ' + JSON.stringify(data))),
          catchError(this.handleError)
      );
   }

     searchProject(searchOption): Observable<IProject[]> {

       const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type':  'application/json'
         })
       };

       return this.http.post<IProject[]>(this.projectapiUrl + '/search', searchOption, httpOptions).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
   }

     AddProject(proj): Observable<boolean> {


       const httpOptions = {
         headers: new HttpHeaders({
           'Content-Type':  'application/json'
         })
       };

       return this.http.post<boolean>(this.projectapiUrl + '/add', proj, httpOptions).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
   }

     UpdateProject(proj): Observable<boolean> {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

       return this.http.post<boolean>(this.projectapiUrl + '/update', proj, httpOptions).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
     }

     DeleteProject(id): Observable<boolean> {
       return this.http.delete<boolean>(this.projectapiUrl + '/delete/' + id).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
     }

     GetProjectById(id): Observable<IProject> {
       return this.http.get<IProject>(this.projectapiUrl + '/' + id).pipe(
           tap(data => console.log('All: ' + JSON.stringify(data))),
           catchError(this.handleError)
       );
     }


    private handleError(err: HttpErrorResponse) {
       let errorMessage;

       if (err.error instanceof ErrorEvent) {
           errorMessage = `An error occured: ${err.error.message}`;
       } else {
           errorMessage = `Server returned code: ${err.status}, error messaage is: ${err.message}`;
       }
       console.error(errorMessage);
       return throwError(errorMessage);
    }
}
