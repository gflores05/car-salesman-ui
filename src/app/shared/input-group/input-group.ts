import { Component, input } from '@angular/core';

@Component({
  selector: 'input-group',
  template: `
    <div class="p-2 gap-2 flex flex-col justify-items-start place-content-start text-left">
      <label>{{ label() }}</label>
      <ng-content />
    </div>
  `,
})
export class InputGroup {
  label = input('');
}
