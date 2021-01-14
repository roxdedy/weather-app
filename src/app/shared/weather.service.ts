import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, finalize, map, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  openweatherApiKey = environment.openweatherApiKey;
  openweatherApiUrl = environment.openweatherApiUrl;

  constructor(private http: HttpClient) {}

  loadingGetDailyForecast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  getDailyForecast(cityId: number): Observable<any> {
    return this.http
      .get(
        `${this.openweatherApiUrl}daily?id=${cityId}&cnt=5&units=metric&appid=${this.openweatherApiKey}`
      )
      .pipe(
        tap(() => {
          this.loadingGetDailyForecast$.next(true);
        }),
        delay(2000), // only for testing loading
        map((resp: any) => ({
          id: cityId,
          city: resp.city.name,
          forecasts: resp.list.map((f: any) => ({
            datetime: this.sanitizeDate(f.dt),
            temperature: this.sanitizeTemperature(f.temp.day),
            windspeed: f.speed,
            description: f.weather[0].description,
            iconUrl: this.createIconUrl(f.weather[0].icon),
          })),
        })),
        catchError(this.handleError),
        finalize(() => {
          this.loadingGetDailyForecast$.next(false);
        })
      );
  }

  private handleError(err: any) {
    let errorMessage: string = 'An error occurred ';

    if (err.error instanceof ErrorEvent) {
      errorMessage += err.error.message;
    } else {
      errorMessage += `${err.status} - ${err.error.message}`;
    }
    return of({ Error: errorMessage });
  }

  private sanitizeDate(date: any) {
    return moment.unix(date).format('ddd, MMMM DD');
  }

  private sanitizeTemperature(temp: number): number {
    return Math.ceil(temp);
  }

  private createIconUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
