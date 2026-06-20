import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'chat-message',
  template: `
    <div
      class="rounded-md w-4/5 p-4"
      [ngClass]="{
        'bg-sky-100': direction() === 'sender',
        'bg-violet-100 justify-self-end': direction() === 'receiver',
      }"
    >
      <p>
        @for (text of content(); track $index) {
          <span class="text-lg text-zinc-700 text-left">{{ text }}</span>
        }
      </p>
      <ng-content />
    </div>
  `,
  imports: [NgClass],
})
export class ChatMessage {
  direction = input('sender');
  content = input<string[]>([]);
}
