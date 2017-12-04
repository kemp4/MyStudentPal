import { Component, OnInit } from '@angular/core';
import { IMessage } from './../models/message';
import { client } from './../dialog-flow-client/dialog-flow.client';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public conversation: IMessage[] = [];
  constructor() { }

  ngOnInit() {
  }

  public processData(message: string): void {
    console.log(message);
      this.conversation.push({
        from: 'Me',
        content: message
      });

      client.textRequest(message).then((response) => {
        console.log(response);
        this.conversation.push({
          from: 'Bot',
          content: response.result.fulfillment['speech'] || 'I can\'t seem to figure that out!'
        });
      });
    }
}
