import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService, Doctor } from '../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDoctorModalComponent } from '../add-doctor-modal/add-doctor-modal.component';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css',
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  selectedDoctor?: Doctor;

  @Output() doctorSelected = new EventEmitter<Doctor>();

  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.dataService.getDoctors().subscribe({
      next: (res) => {
        this.doctors = res;
        // Optionally select the first doctor by default
        // if (this.doctors.length) {
        //   this.selectDoctor(this.doctors[0]);
        // }
      },
      error: (err) => {
        console.error('Error fetching doctors', err);
      },
    });
  }

  selectDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.doctorSelected.emit(doctor);
  }

  deleteDoctor(event: MouseEvent, doctor: Doctor) {
    event.stopPropagation();

    const confirmDelete = confirm(
      `Are you sure you want to delete ${doctor.name}?`
    );
    if (!confirmDelete) {
      return;
    }

    // Remove the doctor from the list using the name
    this.doctors = this.doctors.filter((d) => d.name !== doctor.name);

    // Clear selection if the deleted doctor was selected
    if (this.selectedDoctor === doctor) {
      this.selectedDoctor = undefined;
      this.doctorSelected.emit(undefined);
    }

    alert(`${doctor.name} has been deleted successfully.`);
  }

  openAddDoctorModal() {
    const modalRef = this.modalService.open(AddDoctorModalComponent);
    modalRef.componentInstance.doctorAdded.subscribe((newDoctor: Doctor) => {
      this.doctors.push(newDoctor);
    });
  }
}
