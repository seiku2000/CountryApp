import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryInputSearch } from '../../components/country-input-search/country-input-search';
import { CountryTable } from '../../components/country-table/country-table';
import { CountryService } from '../../services/country.service';
import { Country, DataCountry } from '../../interfaces/data-country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryInputSearch, CountryTable],
  templateUrl: './by-capital-page.html',
  //changeDetection: ChangeDetectionStrategy.Eager,
})
export class ByCapitalPage {


  public searchCarpitalService = inject(CountryService);
  isLoading = signal<boolean>(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);



  onSearch(value: string) {

    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);


    console.log(value);
    this.searchCarpitalService.searchByCapital(value).subscribe((data) => {
      console.log(data);
      this.isLoading.set(false);
      this.countries.set(data);

    });

  }











}
