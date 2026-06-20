import { Service } from '@angular/core';
import { Customer } from '../models/customer';
import axios from 'axios';
import { Observable } from 'rxjs';

@Service()
export class CarSalesmanService {
  async ask(customer: Customer) {
    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: customer.age,
          marital_status: customer.maritalStatus,
          salary: customer.salary,
          country: customer.country,
        }),
      });

      return new Observable((subscriber) => {
        if (!response.body) {
          return;
        }
        // In the browser with fetch adapter, response.data is a ReadableStream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        function readNext() {
          console.log('reading next chunk');
          reader.read().then(({ value, done }) => {
            const chunkText = decoder.decode(value, { stream: true });
            subscriber.next(chunkText);
            if (!done) {
              readNext();
            }
          });
        }

        readNext();
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
