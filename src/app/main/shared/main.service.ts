import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service } from './../../app.service';
import { ResponseData } from './../../models/response-data';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class MainService extends Service {

  constructor(private http: Http) {
    super();
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private asResponseData(response: Response): ResponseData {
    return <ResponseData>response.json();
  }

  getRoomByTeacherName(endpoint: string, requestBody: string): Observable<ResponseData> {
    const queryUrl = `${this.getBaseUrl()}/room/${endpoint}`;
    const headers = { headers: this.getHeaders() };
    return this.http
      .post(queryUrl, JSON.stringify(requestBody), headers).map(this.asResponseData);
  }
}
