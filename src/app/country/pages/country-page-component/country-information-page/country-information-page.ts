import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Countrys } from '../../../interfaces/country.interfacae';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-information-page',
  imports: [DecimalPipe],
  templateUrl: './country-information-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryInformationPage {

  countryInformation = input.required<Countrys>()
}
