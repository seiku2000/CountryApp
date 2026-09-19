import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryTable } from "../../components/country-table/country-table";
import { CountryInputSearch } from "../../components/country-input-search/country-input-search";
import { CountryService } from '../../services/country.service';

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


  onSearch(txtSearch: string) {
    console.log(txtSearch)
  }

}
