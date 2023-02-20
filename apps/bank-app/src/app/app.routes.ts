import { Route } from '@angular/router';
import { AccountListComponent } from '@banking-lib';
import { IndexComponent } from './index/index.component';

export const appRoutes: Route[] = [
    {
        path: 'signin',
        component: IndexComponent
    },
    {
        path: 'accounts',
        component: AccountListComponent
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
