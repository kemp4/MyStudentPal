import { Component, OnInit, Input } from '@angular/core';
import {IScheduleEvent} from './../models/schedule-event';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  public monday: IScheduleEvent[] = [];
  public tuesday: IScheduleEvent[] = [];
  public wednesday: IScheduleEvent[] = [];
  public thursday: IScheduleEvent[] = [];
  public friday: IScheduleEvent[] = [];

  constructor() { }

  ngOnInit() {
  }

  public fillSchedule(responseData: any): void {
    this.monday.push({
      name: responseData.monday[0].name,
      dataStart: responseData.monday[0].dataStart,
      dataEnd: responseData.monday[0].dataEnd,
      room: responseData.monday[0].room
    });
  }
}
