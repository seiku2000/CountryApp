import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-country-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './country-menu.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CountryMenu implements OnInit {

  public isDark = signal<boolean>(true);

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    const activeTheme = savedTheme === 'light' ? 'light' : 'night';
    this.isDark.set(activeTheme === 'night');
    document.documentElement.setAttribute('data-theme', activeTheme);
  }

  toggleTheme(): void {
    const nextDark = !this.isDark();
    this.isDark.set(nextDark);
    const theme = nextDark ? 'night' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
