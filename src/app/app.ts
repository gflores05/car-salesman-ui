import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatContainer } from './chat/chat-container/chat-container';
import { ChatMessage } from './chat/chat-message/chat-message';
import { CustomerForm } from './customer-form/customer-form';
import { Customer } from './models/customer';
import { CarSalesmanService } from './services/car-salesman-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatContainer, ChatMessage, CustomerForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('Car Salesman AI');

  question = signal('');
  response = signal('');

  private sub!: Subscription;

  carSalesmanService = inject(CarSalesmanService);

  async onSubmitForm(customer: Customer) {
    this.question.update(
      (_) =>
        `Yo soy de ${customer.country}, tengo ${customer.age} años de edad, estoy ${customer.maritalStatus}, mi salario actual es de ${customer.salary}`,
    );

    this.sub = (await this.carSalesmanService.ask(customer)).subscribe({
      next: (chunk) => {
        this.response.update((r) => r + chunk);
      },
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe(); // Clean up resource
  }
}
