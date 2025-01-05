import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  DataService,
  Doctor,
  SlotsData,
  TimeSlot,
} from '../../shared/services/data.service';

@Component({
  selector: 'app-appointment-slots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-slots.component.html',
  styleUrl: './appointment-slots.component.css',
})
export class AppointmentSlotsComponent implements OnInit {
  @Input() doctor?: Doctor;
  slotsData?: SlotsData;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getSlots().subscribe({
      next: (res) => {
        this.slotsData = res;
      },
      error: (err) => {
        console.error('Error fetching slots', err);
      },
    });
  }

  selectSlot(slot: TimeSlot) {
    if (!slot.is_occupied) {
      slot.is_selected = !slot.is_selected;
    }
    const allSlots = this.getAllSlots();
    allSlots.forEach((s) => (s.is_selected = false));
    slot.is_selected = true;
  }

  bookAppointment() {
    if (!this.doctor) {
      return alert('Please select a doctor first');
    }

    const selectedSlots = this.getAllSlots().filter((s) => s.is_selected);

    if (selectedSlots.length === 0) {
      return alert('Please select at least one slot');
    }

    alert(
      `Appointment for ${this.doctor.name} at: ` +
        selectedSlots.map((s) => s.time).join(', ') +
        ', has been Created Successfully'
    );

    this.resetSelectedSlots();
  }


  resetSelectedSlots() {
    const allSlots = this.getAllSlots();
    allSlots.forEach((slot) => (slot.is_selected = false));
  }


  isAnySlotSelected(): boolean {
    return this.getAllSlots().some((slot) => slot.is_selected);
  }

  private getAllSlots(): TimeSlot[] {
    if (!this.slotsData) return [];
    const m = this.slotsData.morning.slots;
    const a = this.slotsData.afternoon.slots;
    const e = this.slotsData.evening.slots;
    return [...m, ...a, ...e];
  }
}
