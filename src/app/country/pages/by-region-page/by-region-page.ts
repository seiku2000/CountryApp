import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryTable } from "../../components/country-table/country-table";

@Component({
  selector: 'app-by-region-page',
  imports: [CountryTable],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ByRegionPage { }
