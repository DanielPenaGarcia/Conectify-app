import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpFormService } from './sign-up-form.service';
import { SignUpData, UserCreated } from './sign-up-form.types';

@Component({
  selector: 'form-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent implements OnInit {
  signUpForm: FormGroup;
  step: number = 1;
  lastStep: number = 2;
  @Output() success: EventEmitter<UserCreated> = new EventEmitter<UserCreated>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly SignUpFormService: SignUpFormService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.create();
  }

  private create() {
    return this.formBuilder.group({
      // First step
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      lastNames: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      // Second step
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      passwordConfirmation: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  //Increment step
  nextStep() {
    const isValid = this.validateByStep(this.step);
    if (this.step === this.lastStep && isValid) {
      return this.submit();
    }
    if (isValid) {
      this.step++;
    }
  }

  //Decrement step
  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  private submit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const signUpData: SignUpData = {
      name: this.name.value,
      lastName: this.lastNames.value,
      email: this.email.value,
      password: this.password.value,
      phone: this.phone.value,
    };
    this.SignUpFormService.signUp(signUpData).subscribe({
      next: (user: UserCreated) => {
        this.success.emit(user);
      },
      error: (error) => {
        console.error('Error', error);
      }
    })
  }

  //getters for form controls
  get name() {
    return this.signUpForm.get('name');
  }
  get lastNames() {
    return this.signUpForm.get('lastNames');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get passwordConfirmation() {
    return this.signUpForm.get('passwordConfirmation');
  }
  get phone() {
    return this.signUpForm.get('phone');
  }
  get username() {
    return this.signUpForm.get('username');
  }

  //Get form controls by step
  getFormControlsByStep(step: number): any[] {
    switch (step) {
      case 1:
        return [this.name, this.lastNames, this.phone];
      case 2:
        return [this.email, this.password, this.passwordConfirmation];
      default:
        return [];
    }
  }

  //Validate form by step
  validateByStep(step: number): boolean {
    const controls = this.getFormControlsByStep(step);
    const isValid = controls.every((control) => control.valid);
    if (!isValid) {
      controls.forEach((control) => {
        control.markAsTouched();
      });
    }
    return isValid;
  }
}
