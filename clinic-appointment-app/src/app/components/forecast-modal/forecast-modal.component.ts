import { Component,OnInit } from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forecast-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-modal.component.html',
  styleUrls: ['./forecast-modal.component.css'],
})
export class ForecastModalComponent implements OnInit {
  forecastData: any[] = [];

  constructor(
    private weatherService: WeatherService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.weatherService.getForecast().subscribe((data) => {
      this.forecastData = data.list.filter((item: any) =>
        item.dt_txt.includes('12:00')
      );
    });
  }

  close(): void {
    this.activeModal.close();
  }
}
