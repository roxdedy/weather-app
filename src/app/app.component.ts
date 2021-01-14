import { Component } from '@angular/core';
import { WeatherService } from './shared/weather.service';
import { CITIES } from './shared/cities.data';
import { BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'weather-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cities = CITIES;
  loading$ = this.weatherService.loadingGetDailyForecast$;
  selectedCity$: Subject<number> = new Subject<number>();

  data$ = this.selectedCity$.pipe(
    switchMap((cityId: number) => {
      return this.weatherService.getDailyForecast(cityId);
    })
  );

  constructor(private weatherService: WeatherService) {}

  onSelected(cityId: number): void {
    this.selectedCity$.next(cityId);
  }
}
