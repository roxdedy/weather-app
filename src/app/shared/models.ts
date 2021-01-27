export interface ICityWeather {
  CityId: number;
  CityName: string;
  DailyForecasts: IDailyForecast[];
}

export interface IDailyForecast {
  UnixTimestamp: Date;
  DateString: string;
  Temperature: number;
  Windspeed: number;
  Description: string;
  IconUrl: string;
  IsTodayDate: boolean;
}

export interface IError {
  error: string;
}
