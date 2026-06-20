import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatContainer } from './chat/chat-container/chat-container';
import { ChatMessage } from './chat/chat-message/chat-message';
import { CustomerForm } from './customer-form/customer-form';
import { Customer } from './models/customer';
import { CarSalesmanService } from './services/car-salesman-service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatContainer, ChatMessage, CustomerForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Car Salesman AI');

  image = signal('smiling');
  question = signal('');
  response = signal<string[]>([]);
  loading = signal(false);

  messageSubscription!: Subscription;
  messageSubject = new Subject<string>();

  carSalesmanService = inject(CarSalesmanService);

  async onSubmitForm(customer: Customer) {
    this.question.update(
      (_) =>
        `Yo soy de ${customer.country}, tengo ${customer.age} años de edad, estoy ${customer.maritalStatus === 'Married' ? 'Casado' : 'Soltero'}, mi salario actual es de ${customer.salary}`,
    );

    this.image.set('thinking');
    this.loading.set(true);

    this.messageSubscription = (await this.carSalesmanService.ask(customer)).subscribe({
      next: (chunk) => {
        this.messageSubject.next(chunk);
        this.image.set('idea');
        this.loading.set(false);
        this.response.update((r) => [...r, chunk]);
      },
    });
  }

  isNumeric(str: string) {
    return str.trim() !== '' && !isNaN(Number(str));
  }

  ngOnDestroy() {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
  }
}
