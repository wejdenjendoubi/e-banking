import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MondatService, Mondat } from '../services/mondat';

@Component({
  selector: 'app-mondat',
  templateUrl: './mondat.html',
  styleUrls: ['./mondat.css']
})
export class MondatComponent {
  mondatForm: FormGroup;
  codeRetrait?: number;

  constructor(private fb: FormBuilder, private readonly mondatService: MondatService) {
    this.mondatForm = this.fb.group({
      compteDestinataire: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.mondatForm.valid) {
      this.mondatService.envoyerMondat(this.mondatForm.value).subscribe({
        next: (res: Mondat) => {
          this.codeRetrait = res.codeRetrait;
          alert("Mondat envoyé avec succès. Code de retrait : " + this.codeRetrait);
        },
        error: (err) => {
          console.error("Erreur envoi mondat", err);
          alert("Erreur lors de l'envoi du mondat");
        }
      });
    }
  }
}
