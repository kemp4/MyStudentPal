import { Component } from '@angular/core';
import { IMessage } from './../models/message';
import { client } from './../dialog-flow-client/dialog-flow.client';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  conversation: IMessage[] = [];

  addMessageFromUser(message) {
    this.conversation.push({
      avatar: 'perm_identity',
      from: 'Me',
      content: message.value
    });

    client.textRequest(message.value).then((response) => {
      this.conversation.push({
        avatar: 'android',
        from: 'Bot',
        content: response.result.fulfillment['speech'] || 'I can\'t seem to figure that out!'
      });
      message.value = '';
    });
  }

}
