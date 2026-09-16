import { Routes } from "@angular/router";
import { ByCapitalPage } from "./pages/by-capital-page/by-capital-page";
import { CountryLayout } from "./layout/countryLayout/countryLayout";
import { ByCountryPage } from "./pages/by-country-page/by-country-page";

export const countryRoutes: Routes = [
    {
        path: "",
        component: CountryLayout,//aca en el router outlet va a salir toda la informacion
        //hijo del layout country, todas empiezan por /country
        children: [{
            path: 'by-capital',
            component: ByCapitalPage
        },
        {
            path: 'by-country',
            component: ByCountryPage
        },

        {

            // ruta comodin si no encuentra nada lo redirije al by-capital
            path: '**',
            redirectTo: 'by-capital'
        }



        ]

    }
];

export default countryRoutes;