import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryTable } from "../../components/country-table/country-table";
import { CountryInputSearch } from "../../components/country-input-search/country-input-search";

@Component({
  selector: 'app-by-country-page',
  imports: [CountryTable, CountryInputSearch],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ByCountryPage {


  onSearch(txtSearch: string) {
    console.log(txtSearch)
  }

}
