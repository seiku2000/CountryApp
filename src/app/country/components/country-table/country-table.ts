import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Country } from '../../interfaces/data-country.interface';
import { Countrys } from '../../interfaces/country.interfacae';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-country-table',
  imports: [DecimalPipe, RouterLink],//para utilizar el pipe number
  templateUrl: './country-table.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryTable {
  //para saber si es un proppiedad requerida en el uso del componente
  countries = input<Countrys[]>([]);

  errorMessage = input<string | undefined>('');
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
  emptyMessageError = input<string | null>(null);



  dragAndDropTable(item: Countrys, index: number) {


    console.log(item, index);
  }

  scrollHidenColumns() {

  }


}
