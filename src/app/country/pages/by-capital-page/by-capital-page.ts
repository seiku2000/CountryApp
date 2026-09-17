import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryInputSearch } from '../../components/country-input-search/country-input-search';
import { CountryTable } from '../../components/country-table/country-table';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryInputSearch, CountryTable],
  templateUrl: './by-capital-page.html',
  //changeDetection: ChangeDetectionStrategy.Eager,
})
export class ByCapitalPage {

  onSearch(value: string) {
    console.log(value);
  }











}
