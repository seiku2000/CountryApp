import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { CountryTable } from "../../components/country-table/country-table";
import { CountryInputSearch } from "../../components/country-input-search/country-input-search";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

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


  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      const { query } = params;
      //console.log(query);
      if (!query) return [];
      return await firstValueFrom(this.searchCarpitalService.searchByCountry(query));
    }
  })


  onSearch(txtSearch: string) {
    const trimmed = txtSearch.trim();
    if (!trimmed) {
      this.emptyError.set('Debes ingresar un país para buscar');
      return;
    }
    this.emptyError.set(null);
    this.query.set(trimmed);
  }

}
