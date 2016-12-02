import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {Address} from '../shared/models';

@Component({
  selector: 'address',
  templateUrl:'./address.component.html'
})
export class AddressComponent {
  @Input() mode: string;
  @Input() address: Address;
  @Input() addressIndex: number;
  @Output() onRemoved = new EventEmitter<number>();

  remove(): void {
    if(confirm("Are you sure you want to remove this address?"))
      this.onRemoved.emit(this.addressIndex);
  }
}
