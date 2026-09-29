import { Component, output, signal } from '@angular/core';
import { form, FormField, min, required } from '@angular/forms/signals';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardComboboxComponent, ZardComboboxOption } from '@/shared/components/combobox';
import { ZardFieldImports } from '@/shared/components/field';
import { ZardInputComponent } from '@/shared/components/input';
import { ZardSelectImports } from '@/shared/components/select';
import { Countries, Customer } from '../models/customer';

@Component({
  selector: 'customer-form',
  imports: [
    FormField,
    ZardButtonComponent,
    ZardComboboxComponent,
    ZardFieldImports,
    ZardInputComponent,
    ZardSelectImports,
  ],
  template: `<div z-field-group class="text-left">
    @let age = customerForm.age();
    @let ageInvalid = age.invalid() && age.touched();

    <div z-field>
      <label z-field-label for="customer-country">País</label>
      <z-combobox
        id="customer-country"
        zWidth="full"
        [options]="countryOptions"
        [formField]="customerForm.country"
        placeholder="Selecciona un país"
        searchPlaceholder="Buscar país..."
        emptyText="País no encontrado."
      />
    </div>
    <div z-field [attr.data-invalid]="ageInvalid || null">
      <label z-field-label for="customer-age">Edad</label>
      <input
        z-input
        id="customer-age"
        type="number"
        [formField]="customerForm.age"
        [attr.aria-invalid]="ageInvalid || null"
      />
      @if (ageInvalid) {
        <z-field-error [zErrors]="age.errors()" />
      }
    </div>
    <div z-field>
      <label z-field-label for="customer-marital-status">Estado civil</label>
      <z-select id="customer-marital-status" [formField]="customerForm.maritalStatus">
        <z-select-item zValue="Single">Soltero</z-select-item>
        <z-select-item zValue="Married">Casado</z-select-item>
      </z-select>
    </div>
    <div z-field>
      <label z-field-label for="customer-salary">Salario</label>
      <input
        z-input
        id="customer-salary"
        type="number"
        step="0.01"
        [formField]="customerForm.salary"
      />
    </div>
    <button z-button type="button" [zDisabled]="customerForm().invalid()" (click)="submitForm()">
      Enviar
    </button>
  </div>`,
})
export class CustomerForm {
  countryOptions: ZardComboboxOption[] = Countries.map((country) => ({
    value: country,
    label: country,
  }));

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
