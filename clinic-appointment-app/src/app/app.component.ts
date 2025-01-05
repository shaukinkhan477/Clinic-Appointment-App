import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { DoctorListComponent } from "./components/doctor-list/doctor-list.component";
import { AppointmentSlotsComponent } from "./components/appointment-slots/appointment-slots.component";
import { Doctor } from './shared/services/data.service';
import { HeaderComponent } from "./components/header/header.component";
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    DoctorListComponent,
    AppointmentSlotsComponent,
    HttpClientModule,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'clinic-appointment-app';
  selectedDoctor?: Doctor;

  onDoctorSelected(doctor: Doctor) {
    this.selectedDoctor = doctor;
  }
}
