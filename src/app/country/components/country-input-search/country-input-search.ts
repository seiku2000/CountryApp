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

  eventBackSpace = output<KeyboardEvent>();

  // recibimos el valor del input y lo enviamos al padre 
  onSearch(txtSearch: string) {
    //console.log(txtSearch);
    this.value.emit(txtSearch)//enviamos el valor al padre
  }

  onEventBackSpace(event: KeyboardEvent) {
    // capturamos el evento keydown y validamos si se presiono la tecla backspace y si el valor es 0 enviamos el evento al padre
    if (event.key === 'Backspace' || event.key === 'Enter') {
      //console.log('tecla presionado');

      this.eventBackSpace.emit(event)
    }

  }







}
