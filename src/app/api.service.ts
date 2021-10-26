import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "http://localhost:3000";
  constructor(private httpClient : HttpClient) { }

  handleError(error: HttpErrorResponse){
    let errorMessage = 'Unknown Error!';
    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public get(page,limit) {
    return this.httpClient.get(this.SERVER_URL + '/products',
    { params: new HttpParams({fromString: `_page=`+page+`&_limit=`+limit}), observe: "response"})
    .pipe(retry(3), catchError(this.handleError), tap(res => {
      console.log(res.headers.getAll('Link'));
    }));
  }
}
