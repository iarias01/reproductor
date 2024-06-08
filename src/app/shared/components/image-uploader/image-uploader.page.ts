import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.page.html',
  styleUrls: ['./image-uploader.page.scss'],
})
export class ImageUploaderPage {
  imagePreview: string | ArrayBuffer | null = null;
  @Output() imageSelected = new EventEmitter<File>();

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.imageSelected.emit(file);
    }
  }
}
