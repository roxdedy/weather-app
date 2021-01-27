import { Component, HostBinding, Input } from '@angular/core';
import { IDailyForecast } from '../shared/models';

@Component({
  selector: 'daily-weather-card',
  templateUrl: './daily-weather-card.component.html',
  styleUrls: ['./daily-weather-card.component.scss'],
})
export class DailyWeatherCardComponent {
  @HostBinding('class') get getClass() {
    if (this.data.IsTodayDate) {
      return 'col-12 col-sm-12 col-md-4 col-lg-3 today-date';
    }
    return 'col-12 col-sm-6 col-md-3 col-lg';
  }

  @Input() data!: IDailyForecast;
  constructor() {}
}
