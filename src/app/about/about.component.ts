import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about',
  template: `
    <h1>About</h1>
  `
})
export class AboutComponent {
  constructor(public route: ActivatedRoute) {}
}
