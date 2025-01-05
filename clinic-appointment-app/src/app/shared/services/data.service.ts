import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { SlotsData, TimeSlot } from '../models/slot.model';
export { Doctor, SlotsData, TimeSlot };

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>('assets/Doctors.json');
  }

  getSlots(): Observable<SlotsData> {
    return this.http.get<SlotsData>('assets/Slots.json');
  }
}
