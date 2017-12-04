import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IMessage } from './../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Output() onBotResponseReceived: EventEmitter<string> = new EventEmitter<string>();
  @Input() public conversation: IMessage[];

  addMessageFromUser(message) {
    console.log(message);
    this.onBotResponseReceived.emit(message.value);
    message.value = '';
  }
}
