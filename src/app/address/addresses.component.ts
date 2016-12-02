import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {Address} from '../shared/models';

@Component({
  selector: 'addresses',
  templateUrl: './addresses.component.html'
})
export class AddressesComponent {
  @Input() addresses: Address[];
  @Input() mode: string;

  addContact(): void {
      this.addresses.push(<Address>{
              id:0,
              city:"",
              street: ""
          });
  }

  onRemoved(addressIndex: number): void {
      this.addresses.splice(addressIndex, 1);
  }

}
