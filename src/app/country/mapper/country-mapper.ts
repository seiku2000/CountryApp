import { Countrys } from "../interfaces/country.interfacae";
import { Country, CountryResponse } from "../interfaces/data-country.interface";
//aqui se hace la transformacion de los datos solo los que nececitamos para el componente
//no se altera el flujo original de datos
export class CountryMapper {

    public static getCountryName(country?: Country, lang: string = "spa"): string {
        if (!country) return 'No hay datos';
        return country.names.translations[lang]?.common || country.names.common;
    }


    static mapCountryResponseToCountrys(country: Country): Countrys {
        return {
            cca3: country.codes.alpha_3,
            name: this.getCountryName(country),
            descriptionShort: country.descriptions.short,
            capital: country.capitals.map(capital => capital.name),
            flagEmoji: country.flag.emoji,
            flagUrlSvg: country.flag.url_svg,
            flagUrlPng: country.flag.url_png,
            population: country.population,
            kilometros: country.area.kilometers,
            miles: country.area.miles,
            lat: country.coordinates.lat,
            lng: country.coordinates.lng,
            natalidadM: country.demonyms.eng.m,
            coin: country.currencies.map(coin => coin.name),
            symbol: country.currencies.map(coin => coin.symbol),
            region: country.region,
            timezones: country.timezones.map(timezone => timezone),
        }




    }
    //: Countrys[] 

    //aca lo que estamos haciendo es desestructurar el objeto country
    //y extraer solo la propiedad objects que es un array de objetos 
    static mapCountryTOarrys(country: CountryResponse): Countrys[] {//regresamos un array con data  ya trasformada
        const { data: { objects } } = country;
        return objects.map((items: Country) => this.mapCountryResponseToCountrys(items))


    }



}