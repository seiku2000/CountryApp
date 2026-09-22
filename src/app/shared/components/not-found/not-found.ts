import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class NotFound {


  location = inject(Location);


  goBack() {

    this.location.back();
  }
}
