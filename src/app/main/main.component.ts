import { Component, OnInit } from '@angular/core';
import { IMessage } from './../models/message';
import { client } from './../dialog-flow-client/dialog-flow.client';
import { MainService } from './shared/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MainService]
})
export class MainComponent implements OnInit {
  public conversation: IMessage[] = [];
  constructor(private mainService: MainService) {
  }
  ngOnInit() {
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
  public processData(message: string): void {
    this.pushMine(message);

    client.textRequest(message)
      .then((response) => {
        const fulfillment = response.result.fulfillment;
        this.processBotSpeech(fulfillment['speech']);
        if (fulfillment['messages'].length > 1) {
          this.mainService.getRoomByTeacherName(fulfillment['messages'][1].payload.endpoint,
            fulfillment['messages'][1].payload.parameters).subscribe(responseData => {
            this.pushBot(responseData.message);
          });
        }
      });
    }
}
