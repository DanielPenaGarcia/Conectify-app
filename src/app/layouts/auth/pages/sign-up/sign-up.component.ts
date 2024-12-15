import { Component } from '@angular/core';
import { SignUpFormComponent } from '../../forms/sign-up-form/sign-up-form.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {

  constructor(private readonly router: Router) {}

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  signUpSuccess() {
    this.router.navigate(['/home/accounts/create']);
  }
}
