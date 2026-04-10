import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image, ImageUploadResponse, ImageListResponse } from '../models/image.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = environment.apiUrl.replace('/employee', '/image');

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageUploadResponse>(`${this.apiUrl}/upsert/upload`, formData);
  }

  getAllImages(tenantId: string): Observable<ImageListResponse> {
    return this.http.get<ImageListResponse>(`${this.apiUrl}/search/{tenantId}`);
  }

  downloadImage(tenantId: string, id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/search/{tenantId}/${id}`, { responseType: 'blob' });
  }

  deleteImage(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/upsert/${id}`);
  }
}
