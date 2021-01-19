import { Component, Input, OnInit } from '@angular/core';
import { IDailyForecast } from '../shared/models';

@Component({
  selector: 'daily-weather-card',
  templateUrl: './daily-weather-card.component.html',
  styleUrls: ['./daily-weather-card.component.scss'],
})
export class DailyWeatherCardComponent implements OnInit {
  // @HostBinding('class') classes = 'card';
  @Input() data!: IDailyForecast;
  constructor() {}

  ngOnInit(): void {}
}
