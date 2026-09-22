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
            capital: country.capitals.map(capital => capital.name),
            flagEmoji: country.flag.emoji,
            flagUrlSvg: country.flag.url_svg,
            population: country.population
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