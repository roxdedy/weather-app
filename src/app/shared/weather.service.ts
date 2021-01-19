import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, finalize, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ICityWeather, IError } from './models';
import * as moment from 'moment';

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
    this.loadingGetDailyForecast$.next(true);
    return this.http
      .get<ICityWeather[]>(
        `${this.openweatherApiUrl}daily?id=${cityId}&cnt=5&units=metric&appid=${this.openweatherApiKey}`
      )
      .pipe(
        delay(2000), // only for testing loading
        map((resp: any) => ({
          id: cityId,
          city: resp.city.name,
          forecasts: resp.list.map((item: any) => ({
            datetime: this.sanitizeDate(item.dt),
            temperature: this.sanitizeTemperature(item.temp.day),
            windspeed: item.speed,
            description: item.weather[0].description,
            iconUrl: this.createIconUrl(item.weather[0].icon),
          })),
        })),
        catchError(this.handleError),
        finalize(() => {
          this.loadingGetDailyForecast$.next(false);
        })
      );
  }

  private handleError(err: any): Observable<any> {
    let errorMessage: string = 'An error occurred ';

    if (err.error instanceof ErrorEvent) {
      errorMessage += err.error.message;
    } else {
      errorMessage += `${err.status} - ${err.error.message}`;
    }
    return throwError({ error: errorMessage } as IError);
  }

  private sanitizeDate(date: any): moment.MomentInput {
    return moment.unix(date).format('ddd, MMMM DD');
  }

  private sanitizeTemperature(temp: number): number {
    return Math.ceil(temp);
  }

  private createIconUrl(icon: string): string {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
