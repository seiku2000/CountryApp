import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { countryEnviroments } from '../../environments/country.environments';
import { Country, CountryResponse } from '../interfaces/data-country.interface';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country-mapper';
import { Countrys } from '../interfaces/country.interfacae';


/*
const API_URL = 'https://api.restcountries.com/countries/v5';
const API_key = 'rc_live_8f68a4e063de4ef99d6bde0de571b510'*/
@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);

    //regresa un Observable
    searchByCapital(query: string): Observable<Countrys[]> {
        query = query.toLowerCase();
        //console.log(query);
        //  return of([]);//regresa un observable con un array vacio

        return this.http.get<CountryResponse>(`${countryEnviroments.API_URL}`, {
            headers: {
                Authorization: `Bearer ${countryEnviroments.API_KEY}`
            },
            params: {
                q: query,

            },
            //usamos pipe como un efecto secundario para transformar los datos antes de que lleguen al componente 
            // osea que no se altera el flujo original de datos 
        }).pipe(
            delay(1500),
            map(response => {

                return CountryMapper.mapCountryTOarrys(response);
            }

            )
        );

    }
    searchByCountry(query: string) {
        const url = `${countryEnviroments.API_URL}`
        return this.http.get<CountryResponse>(url, {
            headers: {
                Authorization: `Bearer ${countryEnviroments.API_KEY}`
            },
            params: {
                q: query,
            }

        }).pipe(
            map(response => {
                // console.log(response);
                if (response.data.objects.length === 0) {
                    throw new Error("La informacion que buscas no existe");
                }
                return CountryMapper.mapCountryTOarrys(response);
            })
        )

    }

    searchContryByAlphaCode(code: string) {
        const url = `${countryEnviroments.API_URL}`;
        return this.http.get<CountryResponse>(url, {
            headers: {
                Authorization: `Bearer ${countryEnviroments.API_KEY}`
            },
            params: {
                q: code,
            }
        }).pipe(
            map((res) => CountryMapper.mapCountryTOarrys(res)),
            map((countries) => {
                const contry = countries.find(codeAlpha => codeAlpha.cca3 === code)
                if (!contry) {
                    throw new Error("La informacion que buscas no existe");

                }
                return contry;
            })
            /*
            map((countries) => countries.at(0)),
            map((country) => {
                if (!country) {
                    throw new Error("La informacion que buscas no existe");
                }
                return country;
            }),*/




        )
    }









}
