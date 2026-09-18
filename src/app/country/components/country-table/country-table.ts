import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Country } from '../../interfaces/data-country.interface';
import { Countrys } from '../../interfaces/country.interfacae';

@Component({
  selector: 'app-country-table',
  imports: [],
  templateUrl: './country-table.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryTable {
  countries = input<Countrys[]>([]);



  dragAndDropTable(item: Countrys, index: number) {


    console.log(item, index);
  }

  scrollHidenColumns() {

  }


}
