import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="hero-content">
        <h1 class="names">Anna & Mateusz</h1>
        <p class="date">07 Sierpnia 2026</p>
        
        <div class="countdown">
          <div class="countdown-item">
            <span class="number">{{days}}</span>
            <span class="label">DNI</span>
          </div>
          <div class="countdown-item">
            <span class="number">{{hours}}</span>
            <span class="label">GODZIN</span>
          </div>
          <div class="countdown-item">
            <span class="number">{{minutes}}</span>
            <span class="label">MINUT</span>
          </div>
          <div class="countdown-item">
            <span class="number">{{seconds}}</span>
            <span class="label">SEKUND</span>
          </div>
        </div>

        <div class="hero-buttons">
          <button type="button" (click)="scrollToRsvp($event)" class="hero-btn primary">
            Potwierdź obecność
          </button>
          <a href="https://drive.google.com/drive/folders/1ZgtPkq7tfl01a6ix5p4ltSZu2QeYdlf1?usp=sharing" target="_blank" class="hero-btn secondary">
            📸 Galeria zdjęć
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      height: 100vh;
      background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
                  url('/assets/images/hero-photo.jpeg') center/cover;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
    }

    .hero-content {
      padding: 2rem;
    }

    .names {
      font-family: 'Playfair Display', serif;
      font-size: 4rem;
      margin-bottom: 1rem;
      font-weight: 400;
    }

    .date {
      font-family: 'Lato', sans-serif;
      font-size: 1.5rem;
      letter-spacing: 3px;
      margin-bottom: 3rem;
    }

    .countdown {
      display: flex;
      gap: 2rem;
      justify-content: center;
    }

    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .number {
      font-size: 3rem;
      font-weight: 300;
      font-family: 'Playfair Display', serif;
    }

    .label {
      font-size: 0.9rem;
      letter-spacing: 2px;
      margin-top: 0.5rem;
      font-family: 'Lato', sans-serif;
    }

    .hero-buttons {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      margin-top: 3rem;
    }

    .hero-btn {
      padding: 1rem 2.5rem;
      font-family: 'Lato', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      border-radius: 4px;
      transition: all 0.3s;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .hero-btn.primary {
      background: #87a878;
      color: white;
      border: 2px solid #87a878;
    }

    .hero-btn.primary:hover {
      background: #6b8e5f;
      border-color: #6b8e5f;
    }

    .hero-btn.secondary {
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      border: 2px solid white;
    }

    .hero-btn.secondary:hover {
      background: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    @media (max-width: 768px) {
      .names {
        font-size: 2.5rem;
      }
      .countdown {
        gap: 1rem;
      }
      .number {
        font-size: 2rem;
      }
      .hero-buttons {
        flex-direction: column;
        gap: 1rem;
      }
      .hero-btn {
        padding: 0.75rem 2rem;
      }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  private targetDate = new Date('2026-08-07T18:00:00');
  private intervalId: any;

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCountdown() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance > 0) {
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    } else {
      this.days = this.hours = this.minutes = this.seconds = 0;
    }
  }

  scrollToRsvp(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Current URL:', window.location.href);
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    console.log('URL after scroll:', window.location.href);
  }
}
