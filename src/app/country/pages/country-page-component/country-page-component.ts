import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

import { firstValueFrom, of } from 'rxjs';
import { NotFound } from '../../../shared/components/not-found/not-found';

@Component({
  selector: 'app-country-page-component',
  imports: [NotFound],
  templateUrl: './country-page-component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryPageComponent {

  //hacer de esta forma para detectar cambios en los parametros
  //countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code')//paramMap solo detecta cambios en la url, como /country/parametro?query=1
  // si se cambia de pagina y vuelve al mismo componente se rompe el flujo
  countryCode = inject(ActivatedRoute).snapshot.params['code'];//params detecta cambios en los parametros
  countryService = inject(CountryService);


  contryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      const { code } = params;
      if (!code) return of(undefined);// aqui se maneja la redireccion en un futuro a la pagina de inicio
      return this.countryService.searchContryByAlphaCode(code);

    }


  })

}

export default CountryPageComponent
