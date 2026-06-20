import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ChatLoading } from '../chat-loading/chat-loading';

@Component({
  selector: 'chat-container',
  imports: [ChatLoading],
  template: `
    <div
      #chatContainer
      class="flex flex-col rounded-2xl border border-gray-200 p-8 gap-4 my-4 h-full max-h-9/10 overflow-y-scroll"
    >
      <ng-content />
      @if (loading()) {
        <chat-loading />
      }
    </div>
  `,
})
export class ChatContainer {
  loading = input(false);

  messagesSubject = input<Subject<string>>();
  messageSubscription: Subscription | null = null;

  @ViewChild('chatContainer') private chatContainer!: ElementRef<HTMLDivElement>;

  private scrollToBottom(): void {
    const element = this.chatContainer.nativeElement;
    element.scrollTop = element.scrollHeight;
  }

  ngOnChanges() {
    if (this.messagesSubject() && !this.messageSubscription) {
      this.messageSubscription = this.messagesSubject()!.subscribe((_) => {
        console.log('scrolling');
        this.scrollToBottom();
      });
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
  }
}
