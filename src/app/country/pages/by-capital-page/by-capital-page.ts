import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryInputSearch } from '../../components/country-input-search/country-input-search';
import { CountryTable } from '../../components/country-table/country-table';
import { CountryService } from '../../services/country.service';
//import { Country, DataCountry } from '../../interfaces/data-country.interface';
import { Countrys } from '../../interfaces/country.interfacae';
import { firstValueFrom, of, timeout, TimeoutError } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryInputSearch, CountryTable],
  templateUrl: './by-capital-page.html',
  //changeDetection: ChangeDetectionStrategy.Eager,
})
export class ByCapitalPage {
  public searchCarpitalService = inject(CountryService);//importamos el servicio
  query = signal<string>('');
  emptyError = signal<string | null>(null);



  //rxResource (Se encarga de la carga y el estado de los datos) regresa un observable
  capitalResoure = rxResource({

    params: () => ({ query: this.query() }),
    stream: ({ params }) => {//el stream es como un switchMap pero lo  hace por dentro automaticamente sin que te suscribas o hagas un mapeo
      const { query } = params;//desestructura el objeto de params
      if (!query) return of([]); //of nos permite crear un observable que emita un valor
      return this.searchCarpitalService.searchByCapital(query);
    }
  });

  /*

  //resources (Se encarga de la carga y el estado de los datos) regresa una promesa (puedes usar asyncawait)
  capitalResource = resource({//maneja promesas por si solo sin subscribirse (RxJS) y maneja el estado automaticamente

    params: () => ({ query: this.query() }),//cuando este cambie se ejecutara el loader, este es un signal
    loader: async ({ params }) => {//recibe los params del resource
      const { query } = params;//desestructura el objeto de params
      if (!query) return [];
      //Convierte el observable a promesa con firstValueFrom y luego await para que sea asincrono
      return await firstValueFrom(this.searchCarpitalService.searchByCapital(query));
    }
  });*/



  // Se encarga del ENTER o botón de búsqueda
  onSearch(value: string) {
    const trimmed = value.trim();

    if (!trimmed) {

      this.emptyError.set('Debes ingresar el nombre de una capital para buscar');
      this.query.set('');
      return;
    }

    this.emptyError.set(null);
    this.query.set(trimmed);
  }

  // Se encarga exclusivamente de la tecla BACKSPACE
  onBackSpace(event: KeyboardEvent) {
    if (event.key !== 'Backspace') return;

    const input = event.target as HTMLInputElement;
    const value = input.value.trim();


    // Al borrar, quitamos el error
    this.emptyError.set(null);

    // Si ya borró todo el texto (o le queda solo 1 caracter por borrar):
    if (value.length <= 1) {
      this.query.set(''); // Limpia la tabla y vuelve a mostrar "No countries found"
    }
  }

  // este es un ejemplo de como se podria limpiar el valor cuando se presiona la tecla backspace


  /*
    public searchCarpitalService = inject(CountryService);
    isLoading = signal<boolean>(false);
    isError = signal<string | null>(null);
    countries = signal<Countrys[]>([]);
  
  
  
    onSearch(value: string) {
  
      if (this.isLoading()) return;
      this.isLoading.set(true);
      this.isError.set(null);
  
  
      console.log(value);
      this.searchCarpitalService.searchByCapital(value).subscribe({
        next: (countries) => {
          //console.log(countries);
          this.isLoading.set(false);
          this.countries.set(countries);
        },
        error: (error) => {
          console.log(error);
          this.isLoading.set(false);
          this.countries.set([]);
          this.isError.set(error);
  
        }
      })
  
    }
  */










}
