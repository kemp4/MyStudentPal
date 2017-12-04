import { Component, OnInit } from '@angular/core';
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
    this.monday.push({
      name: 'Konsultacje',
      dataStart: '09:30',
      dataEnd: '10:30',
      room: 213
    });
    this.monday.push({
      name: 'Konsultacje',
      dataStart: '12:30',
      dataEnd: '13:30',
      room: 213
    });
    this.thursday.push({
      name: 'Konsultacje',
      dataStart: '12:30',
      dataEnd: '13:30',
      room: 213
    });
  }

}
