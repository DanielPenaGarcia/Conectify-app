import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageViewerComponent } from '@app/shared/components/image-viewer/image-viewer.component';
import { SelectFileComponent } from '@app/shared/components/select-file/select-file.component';
import { CreateAccountData } from './create-account-form.types';

@Component({
  selector: 'app-create-account-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SelectFileComponent, ImageViewerComponent],
  templateUrl: './create-account-form.component.html',
  styleUrl: './create-account-form.component.scss'
})
export class CreateAccountFormComponent implements OnInit {

  @ViewChild('imageViewer') imageViewer: ImageViewerComponent;
  accountForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.accountForm = this.initAccountForm();
  }

  initAccountForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.minLength(8), Validators.maxLength(20)]],
      profilePicture: [null, []],
      askPassword: [false, [Validators.required]],
    });
  }

  onFileChange(event: FileList) {
    if (event && event.length > 0) {
      this.imageViewer.imageFile = event[0];
      // Asignar también el archivo al formulario
      this.accountForm.patchValue({
        profilePicture: event[0]
      });
    }
  }

  get username() {
    return this.accountForm.get('username');
  }

  get password() {
    return this.accountForm.get('password');
  }

  get profilePicture() {
    return this.accountForm.get('profilePicture');
  }

  get askPassword() {
    return this.accountForm.get('askPassword');
  }

  submit() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }
    const data: CreateAccountData = {
      askPassword: this.askPassword.value,
      password: this.password.value,
      profilePicture: this.profilePicture.value[0],
      username: this.username.value,
    }
    console.log(data);
  }
}
