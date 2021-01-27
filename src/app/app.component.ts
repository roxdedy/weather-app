import { Component } from '@angular/core';
import { WeatherService } from './shared/weather.service';
import { EMPTY, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { IError } from './shared/models';
import { CITIES } from './shared/cities.data';

@Component({
  selector: 'weather-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  RECENTLY_SEARCHED_CITIES = CITIES;
  loading$ = this.weatherService.loadingGetDailyForecast$;
  selectedCity$: Subject<number> = new Subject<number>();
  error$: Subject<IError | null> = new Subject<IError | null>();

  data$ = this.selectedCity$.pipe(
    tap((_) => this.error$.next(null)),
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

  onCitySelected(cityId: number): void {
    this.selectedCity$.next(cityId);
  }
}
