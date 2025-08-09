import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parametres.html',
  styleUrls: ['./parametres.css']
})
export class ParametresComponent {
  profilForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
  this.profilForm = this.fb.group({
    photo: [''],
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]]
  });
}

  onSubmit() {
    if (this.profilForm.invalid) return;

    alert("Modifications enregistrées !");
  }
}
