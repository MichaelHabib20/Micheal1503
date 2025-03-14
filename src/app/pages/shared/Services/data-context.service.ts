import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataContextService {

  public moviesSuject = new BehaviorSubject<string>('');
  public movies$ = this.moviesSuject.asObservable();

  constructor(private http: HttpClient) { }
  
  GetData(url: string) {
    let headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    });
    return this.http.get(url, {
      headers: headers,
      responseType: 'text',
    });
  }
}
