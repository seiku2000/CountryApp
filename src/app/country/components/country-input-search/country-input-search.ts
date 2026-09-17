import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-input-search',
  imports: [],
  templateUrl: './country-input-search.html',
  // changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryInputSearch {

  // recibimos un parametro desde el padre [placeholder] = 'valor'
  placeHolder = input<string>("buscar");

  // emitimos un output al padre (value)= como evento para poder recibirlo en el padre
  value = output<string>();

  // recibimos el valor del input y lo enviamos al padre 
  onSearch(txtSearch: string) {
    this.value.emit(txtSearch)//enviamos el valor al padre
  }


}
