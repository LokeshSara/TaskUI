import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ITaskList} from '../task-list/ITaskList';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {



  //private weatherUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';
    private taskapiUrl = 'http://localhost:54913/api/task';
    //private taskapiUrl = 'http://suchi-pc/TaskApi/api/task';

    /**
     *
     */
    constructor(private http: HttpClient) {

    }

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
        return this.http.post<boolean>(this.taskapiUrl + '/update', task).pipe(
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
