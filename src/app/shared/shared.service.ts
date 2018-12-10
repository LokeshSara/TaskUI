import { Injectable } from "@angular/core";

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';


@Injectable({
    providedIn:'root'
})
export class apiService{

    //private weatherUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20tn%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    private weatherUrl = 'https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=';
    private currencyUrl = "https://api.exchangeratesapi.io/latest";
    /**
     *
     */
    constructor(private http: HttpClient) {
        

    }

    // getWeatherInfo(filter:string): Observable<IWeather>{
    //    return this.http.get<IWeather>(this.weatherUrl + filter).pipe(
    //        tap(data=>console.log('All: '+ JSON.stringify(data))),
    //        catchError(this.handleError)
    //    );
    // }

    // getCurrencyInfo(): Observable<ICurrency>{
    //     return this.http.get<ICurrency>(this.currencyUrl).pipe(
    //         tap(data=>console.log('All: '+ JSON.stringify(data))),
    //         catchError(this.handleError)
    //     );
    //  }

    private handleError(err: HttpErrorResponse){
       let errorMessage;

       if(err.error instanceof ErrorEvent){
           errorMessage = `An error occured: ${err.error.message}`;
       } else{
           errorMessage = `Server returned code: ${err.status}, error messaage is: ${err.message}`;
       }
       console.error(errorMessage);
       return throwError(errorMessage);
    }
}