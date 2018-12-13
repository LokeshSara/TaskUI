import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ITaskList} from '../task-list/ITaskList';

@Injectable({
    providedIn: 'root'
})
export class ApiService {



  //private weatherUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';
    private taskapiUrl = 'http://localhost:54913/api/task';

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

  //   getAllTasks(filter:string): Observable<IWeather>{
  //     return this.http.get<IWeather>(this.weatherUrl + filter).pipe(
  //         tap(data=>console.log('All: '+ JSON.stringify(data))),
  //         catchError(this.handleError)
  //     );
  //  }

    // getCurrencyInfo(): Observable<ICurrency>{
    //     return this.http.get<ICurrency>(this.currencyUrl).pipe(
    //         tap(data=>console.log('All: '+ JSON.stringify(data))),
    //         catchError(this.handleError)
    //     );
    //  }

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
