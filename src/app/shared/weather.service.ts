import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, finalize, map, tap } from 'rxjs/operators';
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
          CityId: cityId,
          CityName: resp.city.name,
          DailyForecasts: resp.list.map((item: any) => ({
            UnixTimestamp: item.dt,
            DateString: this.sanitizeDate(item.dt),
            Temperature: this.sanitizeTemperature(item.temp.day),
            Windspeed: item.speed,
            Description: item.weather[0].description,
            IconUrl: this.createIconUrl(item.weather[0].icon),
            IsTodayDate: this.checkIfDateIsToday(item.dt),
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

  private sanitizeDate(unixtimestamp: any): string {
    const formattedDate = moment.unix(unixtimestamp).format('ddd, MMMM DD');

    return this.checkIfDateIsToday(unixtimestamp) ? 'Today' : formattedDate;
  }

  private sanitizeTemperature(temperature: number): number {
    return Math.ceil(temperature);
  }

  private checkIfDateIsToday(unixtimestamp: any): boolean {
    return (
      new Date(moment().unix() * 1000).getDate() ===
      new Date(unixtimestamp * 1000).getDate()
    );
  }

  private createIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
