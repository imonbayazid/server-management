import { ServerModel } from './interface/server-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/internal/Observable';
//import { ErrorObservable } from 'rxjs/internal/observable/ErrorObservable';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  private  readonly BACKEND_BASE_URL= "http://192.168.99.100:9090";
 
  addServer(server: ServerModel):Observable<ServerModel>{
    return this.http.post<ServerModel>(`${this.BACKEND_BASE_URL}/addserver`, server)
    .pipe(catchError(this.handleError));
  }

  getAllServer(): Observable<ServerModel []> {
    return this.http.get<ServerModel[]>(`${this.BACKEND_BASE_URL}/getallserver`)
    .pipe(catchError(this.handleError));
  }

  getServerByIP(ip: String): Observable<ServerModel>{
    return this.http.get<ServerModel>(`${this.BACKEND_BASE_URL}/getserver/${ip}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateServer(server: ServerModel): Observable<ServerModel>{
   return this.http.post<ServerModel>(`${this.BACKEND_BASE_URL}/updateserver`, server)
    .pipe(catchError(this.handleError));
  }

  deleteServer(id: number): Observable<any>{
    return this.http.delete<any>(`${this.BACKEND_BASE_URL}/deleteserver/${id}`)
    .pipe(catchError(this.handleError));
  }

  pingServer(ip: String): Observable<ServerModel>{
    return this.http.get<ServerModel>(`${this.BACKEND_BASE_URL}/pingserver/${ip}`)
    .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    if (errorRes.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred in client side:', errorRes.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
        console.error('Server Side Error: ', errorRes);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error("'There is a problem with the service. We are notified & working on it. Please try again later.'"));
  }


}
