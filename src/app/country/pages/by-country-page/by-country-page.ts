import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { CountryTable } from "../../components/country-table/country-table";
import { CountryInputSearch } from "../../components/country-input-search/country-input-search";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryTable, CountryInputSearch],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ByCountryPage {

  public searchCarpitalService = inject(CountryService);
  public query = signal<string>('');
  public emptyError = signal<string | null>(null);





  capitalResource = rxResource({

    params: () => ({ query: this.query() }),
    stream: ({ params }) => {//el stream es como un switchMap pero lo  hace por dentro automaticamente sin que te suscribas o hagas un mapeo
      const { query } = params;//desestructura el objeto de params
      if (!query) return of([]); //of nos permite crear un observable que emita un valor
      return this.searchCarpitalService.searchByCountry(query);
    }
  });



  /*
  
    countryResource = resource({
      params: () => ({ query: this.query() }),
      loader: async ({ params }) => {
        const { query } = params;
        //console.log(query);
        if (!query) return [];
        return await firstValueFrom(this.searchCarpitalService.searchByCountry(query));
      }
    })*/


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

}


