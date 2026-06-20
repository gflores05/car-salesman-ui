import { Component, input } from '@angular/core';

@Component({
  selector: 'chat-container',
  template: `
    <div
      class="flex flex-col rounded-2xl border border-gray-200 p-8 gap-4 my-4 h-full max-h-9/10 overflow-y-scroll"
    >
      <ng-content />
    </div>
  `,
})
export class ChatContainer {
  loading = input(false);
}
