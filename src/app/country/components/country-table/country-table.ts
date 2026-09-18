import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Country } from '../../interfaces/data-country.interface';

@Component({
  selector: 'app-country-table',
  imports: [],
  templateUrl: './country-table.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryTable {
  countries = input<Country[]>([]);



  dragAndDropTable(item: Country, index: number) {


    console.log(item, index);
  }

  scrollHidenColumns() {

  }


}
