import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { countryEnviroments } from '../../environments/country.environments';


/*
const API_URL = 'https://api.restcountries.com/countries/v5';
const API_key = 'rc_live_8f68a4e063de4ef99d6bde0de571b510'*/
@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);


    searchByCapital(query: string) {
        query = query.toLowerCase();

        return this.http.get(`${countryEnviroments.API_URL}`, {
            headers: {
                Authorization: `Bearer ${countryEnviroments.API_KEY}`
            },
            params: {
                q: query,

            }
        })

    }









}
