import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CITIES } from '../shared/cities.data';

@Component({
  selector: 'recently-searched-cities',
  templateUrl: './recently-searched-cities.component.html',
  styleUrls: ['./recently-searched-cities.component.scss'],
})
export class RecentlySearchedCitiesComponent implements OnInit {
  selectedCityId = null;
  @Input() cities: any;
  @Output() selected: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  onSelected(cityId: any) {
    this.selectedCityId = cityId;
    this.selected.emit(cityId);
  }
}
