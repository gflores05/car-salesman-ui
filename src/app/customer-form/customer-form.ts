import { Component, output, signal } from '@angular/core';
import { InputGroup } from '../shared/input-group/input-group';
import { form, FormField, min, required } from '@angular/forms/signals';
import { Countries, Customer } from '../models/customer';

@Component({
  selector: 'customer-form',
  imports: [InputGroup, FormField],
  template: `<div class="flex flex-col justify-items-start">
    <input-group label="Pais">
      <select [formField]="customerForm.country" class="p-2 bg-white rounded-lg">
        @for (country of countries; track country) {
          <option value="{{ country }}">{{ country }}</option>
        }
      </select>
    </input-group>
    <input-group label="Edad">
      <input class="p-2 bg-white rounded-lg" type="number" [formField]="customerForm.age" />
    </input-group>
    <input-group label="Estado civil">
      <select class="p-2 bg-white rounded-lg">
        <option value="Soltero">Soltero</option>
        <option value="Casado">Casado</option>
      </select>
    </input-group>
    <input-group label="Salario">
      <input
        class="p-2 bg-white rounded-lg"
        type="number"
        step="0.01"
        [formField]="customerForm.salary"
      />
    </input-group>
    <button
      class="px-4 py-2 bg-sky-800 rounded-lg text-gray-50 mt-4 cursor-pointer hover:bg-sky-600"
      type="button"
      (click)="submitForm()"
    >
      Enviar
    </button>
  </div>`,
})
export class CustomerForm {
  countries = Countries;

  onCompleteForm = output<Customer>();
  customerModel = signal<Customer>({
    age: 18,
    maritalStatus: 'Single',
    country: 'Nicaragua',
    salary: 0,
  });

  customerForm = form(this.customerModel, (path) => {
    min(path.age, 18, { message: 'Edad minima 18' });
    required(path.maritalStatus, { message: 'El estado civil es requerido' });
    required(path.country, { message: 'El pais es requerido' });
    required(path.salary, { message: 'El salario es requerido' });
  });

  submitForm() {
    this.onCompleteForm.emit(this.customerModel());
  }
}
