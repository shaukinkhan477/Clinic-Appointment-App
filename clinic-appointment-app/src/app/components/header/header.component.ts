import {
  Component,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { WeatherService } from '../../shared/services/weather.service';
import { ForecastModalComponent } from '../forecast-modal/forecast-modal.component';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cityName: string = 'Noida';
  temperature: number | undefined;
  currentTime: Date = new Date();
  private intervalId?: number;

  constructor(
    private weatherService: WeatherService,
    private modalService: NgbModal,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.weatherService.getCurrentWeather().subscribe((data) => {
      this.temperature = data.main.temp;
    });


    this.ngZone.runOutsideAngular(() => {
      this.intervalId = window.setInterval(() => {
        this.currentTime = new Date();
        this.ngZone.run(() => {
          this.cdr.markForCheck();
        });
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  openForecastModal(): void {
    const modalRef = this.modalService.open(ForecastModalComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.data = {};
  }
}
