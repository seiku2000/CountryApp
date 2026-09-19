import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { CountryInputSearch } from '../../components/country-input-search/country-input-search';
import { CountryTable } from '../../components/country-table/country-table';
import { CountryService } from '../../services/country.service';
//import { Country, DataCountry } from '../../interfaces/data-country.interface';
import { Countrys } from '../../interfaces/country.interfacae';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryInputSearch, CountryTable],
  templateUrl: './by-capital-page.html',
  //changeDetection: ChangeDetectionStrategy.Eager,
})
export class ByCapitalPage {
  public searchCarpitalService = inject(CountryService);
  query = signal<string>('');
  emptyError = signal<string | null>(null);

  capitalResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      const { query } = params;
      if (!query) return [];

      return await firstValueFrom(this.searchCarpitalService.searchByCapital(query));
    }
  });

  onSearch(value: string) {
    const trimmed = value.trim();

    if (!trimmed) {
      this.emptyError.set('Debes ingresar el nombre de una capital para buscar');
      return;
    }

    this.emptyError.set(null);
    this.query.set(trimmed);
  }

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
