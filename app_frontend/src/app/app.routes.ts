import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { QueryListComponent } from './query-list/query-list.component';

// List of routes for the application
// Simply just mapping the path to the component.

export const routes: Routes = [
    { path: 'form',   component: FormComponent },
    { path: 'query-list', component: QueryListComponent },
    { path: '', redirectTo: '/form', pathMatch: 'full' }, // Default route
];
