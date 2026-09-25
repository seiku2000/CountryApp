import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryTable } from "../../components/country-table/country-table";
import { Countrys, Regiones } from '../../interfaces/country.interfacae';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryTable],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ByRegionPage {

  public searchRegiones = inject(CountryService)

  public Regions: Regiones[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  public query = signal<string>('');

  regionResource = rxResource({

    params: () => ({ region: this.query() }),
    stream: ({ params }) => {//el stream es como un switchMap pero lo  hace por dentro automaticamente sin que te suscribas o hagas un mapeo
      const { region } = params;//desestructura el objeto de params
      if (!region) return of([]); //of nos permite crear un observable que emita un valor
      return this.searchRegiones.searchCountryByRegion(region);
    }
  });


  onSelectRegion(region: Regiones) {
    // console.log(region);
    if (this.query() === region) return;
    this.query.set(region);
    //this.query.set(region);
  }
}
