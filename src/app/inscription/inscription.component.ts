import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from 'src/Modeles/user';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      numeroCIN: ['', [Validators.required]],
      magasin: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form is valid, submitting...', this.signupForm.value);
      const newUser: User = this.signupForm.value;
      this.authService.signup(newUser).subscribe(response => {
        console.log('Response from signup API:', response);
        alert('Inscription réussie! En attente de validation par l\'administrateur.');
      }, error => {
        console.error('Error during signup:', error);
        alert('Erreur lors de l\'inscription');
      });
    } else {
      console.log('Form is invalid');
      this.logFormErrors();
    }
  }

  private logFormErrors() {
    Object.keys(this.signupForm.controls).forEach(key => {
      const controlErrors = this.signupForm.get(key)?.errors;
      if (controlErrors) {
        console.error(`Form control ${key} is invalid due to`, controlErrors);
      }
    });
  }
}
