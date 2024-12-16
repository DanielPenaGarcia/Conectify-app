import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.scss'
})
export class ImageViewerComponent {
  
  image: string | ArrayBuffer | null = null;
  @Input() shape: 'circle' | 'square' = 'circle';

  set imageFile(file: File | null) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.image = event.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
