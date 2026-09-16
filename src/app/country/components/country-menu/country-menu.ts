import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-country-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './country-menu.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryMenu { }
