import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-file',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-file.component.html',
  styleUrl: './select-file.component.scss'
})
export class SelectFileComponent {
  @Input() label: string = 'Select File';
  @Input() accept: 'image/*' | 'audio/*' | 'video/*' | string = '*';
  @Input() multiple: boolean = false;
  @Input() disabled: boolean = false;
  @Input() controls: AbstractControl;
  @Input() icon: string;

  @Output() fileChange: EventEmitter<FileList> = new EventEmitter<FileList>();

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.fileChange.emit(input.files);
      if (this.controls) {
        this.controls.setValue(input.files);
        this.controls.markAsTouched();
      }
    }
  }
  

  async openFileInput() {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
      if (this.controls) {
        this.controls.markAsTouched();
      }
    }
  }
}
