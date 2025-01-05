import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Doctor } from '../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-doctor-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-doctor-modal.component.html',
  styleUrl: './add-doctor-modal.component.css',
})
export class AddDoctorModalComponent {
  doctor: Doctor = {
    name: '',
    qualification: '',
    description: '',
    image_url: '',
  };

  @Output() doctorAdded = new EventEmitter<Doctor>();

  constructor(public activeModal: NgbActiveModal) {}

  onSubmit() {
    this.doctorAdded.emit(this.doctor);
    this.activeModal.close();
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}

