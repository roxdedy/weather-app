import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DailyWeatherCardComponent } from './daily-weather-card/daily-weather-card.component';
import { RecentlySearchedCitiesComponent } from './recently-searched-cities/recently-searched-cities.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, DailyWeatherCardComponent, RecentlySearchedCitiesComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
