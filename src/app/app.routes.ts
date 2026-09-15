import { Routes } from '@angular/router';
import { HomePage } from './shared/pages/home-page/home-page';

export const routes: Routes = [
    {
        path: "home",
        component: HomePage
        //esto es por lazy loading
        // loadComponent: () => import("./shared/pages/home-page/home-page").then(m => m.HomePage),
    },
    {
        path: 'country',
        // esto es por lazy loading
        loadChildren: () => import('./country/country.routes'),

        //loadChildren: () => import('./country/country.routes').then(m => m.routes)
    },
    {
        path: "**",
        redirectTo: "home",
    }
];
