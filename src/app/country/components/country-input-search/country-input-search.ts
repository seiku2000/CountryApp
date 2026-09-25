import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

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

  initialValue = input<string>('');

  eventBackSpace = output<KeyboardEvent>();

  //esto muy util para que el linkedSignal se actualice cando cambie el initialValue
  //es como si fuera una signal que depende de otra signal y siempre tendrá su mismo valor.
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');






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

  debounceValue = effect((onCleanup) => {
    const value = this.inputValue();

    // Si está vacío (por ejemplo al iniciar el componente), no emitir para no activar emptyError
    if (!value || value.trim().length === 0) return;

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 1000);

    // aqui llamamos a la funcion cleanup para limpiar el timeout antes corra el efecto de nuevo
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });






}
