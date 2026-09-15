import { Routes } from "@angular/router";
import { ByCapitalPage } from "./pages/by-capital-page/by-capital-page";
import { CountryLayout } from "./layout/countryLayout/countryLayout";

export const countryRoutes: Routes = [
    {
        path: "",
        component: CountryLayout,

    }
];

export default countryRoutes;