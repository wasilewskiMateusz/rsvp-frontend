import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="location">
      <div class="container">
        <h2>Gdzie & Kiedy</h2>
        
        <div class="location-grid">
          <div class="location-card">
            <div class="icon">💒</div>
            <h3>Ceremonia</h3>
            <p class="time">18:00</p>
            <p class="address">Ceremonia odbędzie się w Altanie na Wodzie na terenie obiektu</p>
          </div>

          <div class="location-card">
            <div class="icon">🎉</div>
            <h3>Wesele</h3>
            <p class="time">18:30</p>
            <p class="address">Wesele odbędzie się na sali Brylantowej</p>
          </div>

          <div class="location-card">
            <div class="icon">🍻</div>
            <h3>Poprawiny</h3>
            <p class="time">14:00</p>
            <p class="address">Poprawiny odbędą się w "Kurniku" na terenie obiektu</p>
          </div>
        </div>

        <div class="map-container">
          <iframe 
            [src]="mapUrl"
            width="100%" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .location {
      padding: 5rem 0;
      background: #f4f7f2;
    }

    .container {
      max-width: 1200px;
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

    .location-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .location-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #87a878;
    }

    .time {
      font-family: 'Lato', sans-serif;
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      color: #666;
    }

    .address {
      font-family: 'Lato', sans-serif;
      color: #888;
      line-height: 1.6;
    }

    .map-container {
      margin-top: 2rem;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
  `]
})
export class LocationComponent {
  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Google Maps embed URL
    const embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.8!2d19.2432402!3d51.8341119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471bb30333806b0f%3A0x670395c2776b5658!2sCzarny%20Staw%20Hotel!5e0!3m2!1spl!2spl!4v1738099123456!5m2!1spl!2spl';
    
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
