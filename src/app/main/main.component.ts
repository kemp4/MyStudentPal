import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { IMessage } from './../models/message';
import { client } from './../dialog-flow-client/dialog-flow.client';
import { MainService } from './shared/main.service';
import {IScheduleEvent} from './../models/schedule-event';
import {ScheduleComponent} from '../schedule/schedule.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MainService]
})
export class MainComponent implements OnInit, AfterViewInit {
  public conversation: IMessage[] = [];
  public monday: IScheduleEvent[] = [];
  public tuesday: IScheduleEvent[] = [];
  public wednesday: IScheduleEvent[] = [];
  public thursday: IScheduleEvent[] = [];
  public friday: IScheduleEvent[] = [];
  @ViewChild(ScheduleComponent) scheduleComponent: ScheduleComponent;
  constructor(private mainService: MainService) {
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  private pushMine(message: string): void {
    this.conversation.push({
      from: 'Me',
      content: message
    });
  }
  private pushBot(message: string): void {
    this.conversation.push({
      from: 'Bot',
      content: message
    });
  }
  private processBotSpeech(incomingSpeech: string): void {
    const speech = incomingSpeech || 'I can\'t seem to figure that out!';
    this.pushBot(speech);
  }
  private fillSchedule(responseData: any): void {
    this.monday = responseData.monday;
    this.tuesday = responseData.tuesday;
    this.wednesday = responseData.wednesday;
    this.thursday = responseData.thursday;
    this.friday = responseData.friday;
  }
  public processData(message: string): void {
    this.pushMine(message);

    client.textRequest(message)
      .then((response) => {
        const fulfillment = response.result.fulfillment;
        const endpoint = response.result.fulfillment['messages'][1].payload.endpoint;
        const parameters = response.result.fulfillment['messages'][1].payload.parameters;
        const responseType = response.result.fulfillment['messages'][1].payload.responseType;
        this.processBotSpeech(fulfillment['speech']);
        if (fulfillment['messages'].length > 1) {
          this.mainService.callRestApi(endpoint, parameters, responseType).subscribe(responseData => {
            this.pushBot(responseData.message);
            if (responseType === 'ScheduleResponse') {
              this.fillSchedule(responseData.schedule);
              this.scheduleComponent.fillSchedule(responseData.schedule);
            }
          });
        }
      });
  }
}
