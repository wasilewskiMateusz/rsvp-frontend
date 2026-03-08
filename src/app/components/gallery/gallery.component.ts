import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="gallery" id="gallery">
      <div class="container">
        <h2>Nasza Galeria</h2>
        
        <div class="gallery-grid">
          <div *ngFor="let photo of photos; let i = index" 
               class="gallery-item"
               (click)="openLightbox(i)">
            <img [src]="photo" [alt]="'Zdjęcie ' + (i + 1)">
            <div class="overlay">
              <span class="zoom-icon">🔍</span>
            </div>
          </div>
        </div>

        <!-- Lightbox -->
        <div *ngIf="lightboxOpen" class="lightbox" (click)="closeLightbox()">
          <button class="close-btn" (click)="closeLightbox()">&times;</button>
          
          <button class="nav-btn prev" (click)="previousImage($event)" *ngIf="photos.length > 1">
            &#10094;
          </button>
          
          <img [src]="photos[currentImageIndex]" 
               [alt]="'Zdjęcie ' + (currentImageIndex + 1)"
               class="lightbox-image"
               (click)="$event.stopPropagation()">
          
          <button class="nav-btn next" (click)="nextImage($event)" *ngIf="photos.length > 1">
            &#10095;
          </button>

          <div class="image-counter">
            {{ currentImageIndex + 1 }} / {{ photos.length }}
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gallery {
      padding: 5rem 0;
      background: white;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      text-align: center;
      margin-bottom: 3rem;
      color: #333;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .gallery-item {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .gallery-item:hover {
      transform: scale(1.03);
      box-shadow: 0 8px 25px rgba(135, 168, 120, 0.3);
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .gallery-item:hover .overlay {
      opacity: 1;
    }

    .zoom-icon {
      font-size: 3rem;
      color: white;
    }

    /* Lightbox */
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.95);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      animation: fadeIn 0.3s;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .lightbox-image {
      max-width: 90%;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 10px 50px rgba(0,0,0,0.5);
    }

    .close-btn {
      position: absolute;
      top: 2rem;
      right: 2rem;
      background: none;
      border: none;
      color: white;
      font-size: 4rem;
      cursor: pointer;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
      z-index: 10000;
    }

    .close-btn:hover {
      transform: scale(1.2);
    }

    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 3rem;
      cursor: pointer;
      width: 60px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s;
      z-index: 10000;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .nav-btn.prev {
      left: 2rem;
    }

    .nav-btn.next {
      right: 2rem;
    }

    .image-counter {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-family: 'Lato', sans-serif;
      font-size: 1.2rem;
      background: rgba(0, 0, 0, 0.5);
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
    }

    @media (max-width: 968px) {
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      h2 {
        font-size: 2.2rem;
      }

      .nav-btn {
        width: 50px;
        height: 60px;
        font-size: 2rem;
      }

      .nav-btn.prev {
        left: 0.5rem;
      }

      .nav-btn.next {
        right: 0.5rem;
      }

      .close-btn {
        top: 1rem;
        right: 1rem;
        font-size: 3rem;
        width: 50px;
        height: 50px;
      }
    }

    @media (max-width: 576px) {
      .gallery-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class GalleryComponent {
  photos: string[] = [
    '/assets/images/gallery/IMG_0066.jpg',
    '/assets/images/gallery/IMG_1714.jpg',
    '/assets/images/gallery/IMG_7207.jpg',
    '/assets/images/gallery/IMG_7114.jpg',
    '/assets/images/gallery/IMG_1962.JPG',
    '/assets/images/gallery/IMG_6525.jpg',
    '/assets/images/gallery/IMG_4541.jpg',
    '/assets/images/gallery/IMG_0953.jpg',
    '/assets/images/gallery/IMG_4171.jpg',
  ];

  lightboxOpen = false;
  currentImageIndex = 0;

  openLightbox(index: number) {
    this.currentImageIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden'; // Blokuj scrollowanie
  }

  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = ''; // Przywróć scrollowanie
  }

  nextImage(event: Event) {
    event.stopPropagation();
    this.currentImageIndex = (this.currentImageIndex + 1) % this.photos.length;
  }

  previousImage(event: Event) {
    event.stopPropagation();
    this.currentImageIndex = (this.currentImageIndex - 1 + this.photos.length) % this.photos.length;
  }
}