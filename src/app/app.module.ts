import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DailyWeatherCardComponent } from './daily-weather-card/daily-weather-card.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  declarations: [AppComponent, DailyWeatherCardComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
