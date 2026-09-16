import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-country-menu',
  imports: [RouterLink],
  templateUrl: './country-menu.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryMenu { }
