import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { AuthService } from '../../services/auth.service';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-image-management',
  templateUrl: './image-management.component.html',
  styleUrls: ['./image-management.component.css']
})
export class ImageManagementComponent implements OnInit {
  images: Image[] = [];
  selectedFile: File | null = null;
  tenantId: string = '';
  searchId: string = '';
  loading = false;
  message = '';

  constructor(
    private imageService: ImageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.tenantId = sessionStorage.getItem('tenantName') || '';
    if (this.tenantId) {
      this.loadImages();
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      this.message = 'Please select a file';
      return;
    }

    this.loading = true;
    this.imageService.uploadImage(this.selectedFile).subscribe({
      next: (response) => {
        this.message = response.message;
        this.selectedFile = null;
        this.loading = false;
      },
      error: (error) => {
        this.message = 'Upload failed: ' + error.message;
        this.loading = false;
      }
    });
  }

  loadImages(): void {
    this.loading = true;
    this.imageService.getAllImages(this.tenantId).subscribe({
      next: (response) => {
        this.images = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.message = 'Failed to load images: ' + error.message;
        this.loading = false;
      }
    });
  }

  downloadImage(id: string, fileName: string): void {
    this.imageService.downloadImage(this.tenantId, id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.message = 'Download failed: ' + error.message;
      }
    });
  }

  deleteImage(id: string): void {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    this.loading = true;
    this.imageService.deleteImage(id).subscribe({
      next: (response) => {
        this.message = response.message;
        this.loadImages();
      },
      error: (error) => {
        this.message = 'Delete failed: ' + error.message;
        this.loading = false;
      }
    });
  }

  searchById(): void {
    if (!this.searchId) {
      return;
    }

    this.loading = true;
    this.imageService.downloadImage(this.tenantId, this.searchId).subscribe({
      next: (blob) => {
        this.message = 'Image found';
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `image-${this.searchId}`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.loading = false;
      },
      error: (error) => {
        this.message = 'Image not found';
        this.loading = false;
      }
    });
  }
}
