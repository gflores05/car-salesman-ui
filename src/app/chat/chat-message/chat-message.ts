import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'chat-message',
  template: `
    <div
      class="rounded-md w-3/5 p-4"
      [ngClass]="{
        'bg-sky-100': direction() === 'sender',
        'bg-violet-100 justify-self-end': direction() === 'receiver',
      }"
    >
      @if (text()) {
        <p class="text-lg text-zinc-700 text-left">{{ text() }}</p>
      }
      <ng-content />
    </div>
  `,
  imports: [NgClass],
})
export class ChatMessage {
  direction = input('sender');
  text = input('');
}
