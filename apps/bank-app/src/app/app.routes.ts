import { Route } from '@angular/router';
import { AccountListComponent } from '@banking-lib';
import { IndexComponent } from './index/index.component';

export const appRoutes: Route[] = [
    {
        path: 'signin',
        component: IndexComponent
        // implement canActivate guard to check if user is authenticated
        // redirect to accounts if authenticated
        // requires app state to implement
    },
    {
        path: 'accounts',
        component: AccountListComponent
        // implement canActivate guard to check if user is authenticated
        // use NGRX to store user details and token
    },
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'signin',
        pathMatch: 'full'
    }
];
