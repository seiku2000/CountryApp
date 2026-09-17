import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CountryInputSearch } from '../../components/country-input-search/country-input-search';
import { CountryTable } from '../../components/country-table/country-table';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryInputSearch, CountryTable],
  templateUrl: './by-capital-page.html',
  //changeDetection: ChangeDetectionStrategy.Eager,
})
export class ByCapitalPage {


  public searchCarpitalService = inject(CountryService)
  onSearch(value: string) {
    console.log(value);
    this.searchCarpitalService.searchByCapital(value).subscribe((data) => {
      console.log(data);
    })

  }











}
