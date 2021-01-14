import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyWeatherCardComponent } from './daily-weather-card.component';

describe('WeatherCardComponent', () => {
  let component: DailyWeatherCardComponent;
  let fixture: ComponentFixture<DailyWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyWeatherCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
