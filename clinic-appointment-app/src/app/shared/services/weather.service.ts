import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '804f1d94152dd76f1a333e5020d4508e';
  private lat = 28.57;
  private lon = 77.32;

  constructor(private http: HttpClient) {}

  getCurrentWeather(): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.apiKey}`
    );
  }

  getForecast(): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.apiKey}`
    );
  }
}
