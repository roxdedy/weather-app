export interface ICityWeather {
  id: number;
  city: string;
  forecasts: IDailyForecast[];
}

export interface IDailyForecast {
  datetime: Date;
  temperature: number;
  windspeed: number;
  description: string;
  iconUrl: string;
}

export interface IError {
  error: string;
}
