import { Component } from '@angular/core';
import { WeatherService } from './shared/weather.service';
import { CITIES } from './shared/cities.data';
import { EMPTY, Subject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { IError } from './shared/models';

@Component({
  selector: 'weather-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cities = CITIES;
  loading$ = this.weatherService.loadingGetDailyForecast$;
  selectedCity$: Subject<number> = new Subject<number>();
  error$: Subject<IError> = new Subject<IError>();

  data$ = this.selectedCity$.pipe(
    switchMap((cityId: number) => {
      return this.weatherService.getDailyForecast(cityId).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      );
    })
  );

  constructor(private weatherService: WeatherService) {}

  onSelected(cityId: number): void {
    this.selectedCity$.next(cityId);
  }
}
