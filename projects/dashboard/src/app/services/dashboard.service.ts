import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TweetForInitialCredibility } from '../models/TweetForInitialCredibility';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  twitter = environment.nishanTwitterApiUrl;
  baseUrl = environment.nishanApiUrl;
constructor(private http: HttpClient) { }

  sendQuery(query: TweetForInitialCredibility) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const options = { headers };
    // console.log('model', model);
    return this.http.post<any>(this.baseUrl + 'credibility', query, options).pipe(map(response => response))
    .pipe(
      catchError(this.handleError)
    );
  }

  sendName(name: string) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const options = { headers };
    // console.log('model', model);
    return this.http.get<any>(this.baseUrl + 'bot/' + name, options).pipe(map(response => response))
    .pipe(
      catchError(this.handleError)
    );
  }

  progress(id: number) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const options = { headers };
    // console.log('model', model);
    return this.http.get<any>(this.baseUrl + 'progress/' + id, options).pipe(map(response => response))
    .pipe(
      catchError(this.handleError)
    );
  }

  getCredibility(what: number, who: number) {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    const options = { headers };
    // console.log('model', model);
    return this.http.get<any>(this.baseUrl + 'final/' + what + '/' + who, options).pipe(map(response => response))
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // console.log('error', error);
    if (error.status === 404) {
      return throwError('No data available for that request');
    }
    if (error.status === 400) {
      return throwError(error.error.message);
    }
    if (error.status === 500) {
      return throwError('Server error occured, please try again');
    }
  }
}
