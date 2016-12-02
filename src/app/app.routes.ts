import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import {PersonComponent} from './person';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'person/:id',  component: PersonComponent },
  { path: 'person/:id/:mode',  component: PersonComponent },
  { path: '**',    component: NoContentComponent },
];
