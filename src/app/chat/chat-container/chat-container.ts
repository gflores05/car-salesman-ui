import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ZardMessageImports } from '@/shared/components/message';
import { ZardSpinnerComponent } from '@/shared/components/spinner';

@Component({
  selector: 'chat-container',
  imports: [ZardMessageImports, ZardSpinnerComponent],
  template: `
    <div
      #chatContainer
      class="bg-card flex flex-col rounded-xl border p-6 gap-6 my-4 h-full max-h-9/10 overflow-y-auto"
    >
      <ng-content />
      @if (loading()) {
        <z-message zVariant="muted">
          <z-spinner class="size-5" />
        </z-message>
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
        this.scrollToBottom();
      });
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
  }
}
