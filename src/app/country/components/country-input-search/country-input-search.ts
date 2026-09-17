import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-input-search',
  imports: [],
  templateUrl: './country-input-search.html',
  // changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryInputSearch {
  placeHolder = input<string>("buscar");


  value = output<string>();

  onSearch(txtSearch: string) {
    this.value.emit(txtSearch)
  }


}
