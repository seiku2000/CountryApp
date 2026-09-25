import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { countryEnviroments } from '../../environments/country.environments';
import { Country, CountryResponse } from '../interfaces/data-country.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country-mapper';
import { Countrys, Regiones } from '../interfaces/country.interfacae';


/*
const API_URL = 'https://api.restcountries.com/countries/v5';
const API_key = 'rc_live_8f68a4e063de4ef99d6bde0de571b510'*/
@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);
    private queryCacheCapital = new Map<string, Countrys[]>();//aca voy a guardar las respuestas que ya obtuve
    private queryCacheByCountry = new Map<string, Countrys[]>();
    private queryCacheRegion = new Map<string, Countrys[]>();
    /*
        public Regions: Regiones[] = [
            'Africa',
            'Americas',
            'Asia',
            'Europe',
            'Oceania',
            'Antarctic',
        ];*/

    //regresa un Observable
    searchByCapital(query: string): Observable<Countrys[]> {
        query = query.toLowerCase();

        if (this.queryCacheCapital.has(query)) {//revisa si la consulta ya fue realizada
            return of(this.queryCacheCapital.get(query) ?? []); //si ya fue realizada, regresa los datos guardados
        }

        console.log(`llegando por el servidor ${query}`);


        //llamar a la api por capital usando enviroments 
        return this.http.get<CountryResponse>(`${countryEnviroments.API_URL}`, {
            headers: {//agregamos los headers para la autenticacion con api key
                Authorization: `Bearer ${countryEnviroments.API_KEY}`
            },
            params: {//agregamos los parametros para la busqueda de la capital
                q: query,

            },
            //usamos pipe como un efecto secundario para transformar los datos antes de que lleguen al componente 
            // osea que no se altera el flujo original de datos 
        }).pipe(
            delay(500),

            map(response => {

                return CountryMapper.mapCountryTOarrys(response);//aca uso el mapper para transformar los datos a usar
            }),
            tap((response) => this.queryCacheCapital.set(query, response)),//aca guardo la respuesta en el cache
        )

    }
    searchByCountry(query: string) {
        const url = `${countryEnviroments.API_URL}`
        if (this.queryCacheByCountry.has(query)) {//revisa si la consulta ya fue realizada
            return of(this.queryCacheByCountry.get(query) ?? []);//si ya fue realizada, regresa los datos guardados
        }
        console.log(`llegando por el servidor desde country ${query}`);
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

                return CountryMapper.mapCountryTOarrys(response);
            }),
            tap((response) => this.queryCacheByCountry.set(query, response))
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
        }).pipe(// usamo pipe para transformar los datos antes de que lleguen al componente  
            map((res) => CountryMapper.mapCountryTOarrys(res)),//aca uso el mapper para transformar los datos a usar 
            map((countries) => {//aca uso el mapper para transformar los datos a usar
                const contry = countries.find(codeAlpha => codeAlpha.cca3 === code)//busca el pais por el codigo alpha comparando con cada pais 
                if (!contry) {//si no encuentra el pais
                    throw new Error("La informacion que buscas no existe");

                }
                return contry;//si encuentra el pais, lo regresa
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

    searchCountryByRegion(region: string) {
        region = region.toLowerCase();

        if (this.queryCacheRegion.has(region)) {
            return of(this.queryCacheRegion.get(region) ?? [])

        }
        console.log(`llegando por el servidor desde country ${region}`);

        return this.http.get<CountryResponse>(`${countryEnviroments.API_URL}`, {

            headers: {//agregamos los headers para la autenticacion con api key
                Authorization: `Bearer ${countryEnviroments.API_KEY}`
            },
            params: {//agregamos los parametros para la busqueda de la capital
                q: region,

            },


        }).pipe(
            map((res) => CountryMapper.mapCountryTOarrys(res)),
            map((country) => {
                const Regions = country.filter(country => country.region.toLowerCase() === region.toLowerCase());
                return Regions
            }),
            tap((response) => this.queryCacheRegion.set(region, response)),


        )



    }











}
