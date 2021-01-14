import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'daily-weather-card',
  templateUrl: './daily-weather-card.component.html',
  styleUrls: ['./daily-weather-card.component.scss'],
})
export class DailyWeatherCardComponent implements OnInit {
  @HostBinding('class') classes = 'card p-3 border bg-light card shadow-sm rounded';
  @Input() data: any;
  constructor() {}

  ngOnInit(): void {}
}
