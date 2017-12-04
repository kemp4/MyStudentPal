import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Service } from './../../app.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {SingleMessageResponse} from '../../models/single-message-response';
import {ScheduleResponse} from '../../models/schedule-response';


@Injectable()
export class MainService extends Service {

  constructor(private http: Http) {
    super();
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return headers;
  }

  private asSingleMessageResponse(response: Response): SingleMessageResponse {
    return <SingleMessageResponse>response.json();
  }

  private asScheduleResponse(response: Response): ScheduleResponse {
    return <ScheduleResponse>response.json();
  }

  callRestApi(endpoint: string, requestBody: string, responseType: string): Observable<any> {
    const queryUrl = `${this.getBaseUrl()}/${endpoint}`;
    const headers = { headers: this.getHeaders() };
    if (responseType === 'SingleMessageResponse') {
      return this.http
        .post(queryUrl, JSON.stringify(requestBody), headers).map(
          this.asSingleMessageResponse
        );
    } else if (responseType === 'ScheduleResponse') {
      return this.http
        .post(queryUrl, JSON.stringify(requestBody), headers).map(
          this.asScheduleResponse
        );
    }
  }
}
