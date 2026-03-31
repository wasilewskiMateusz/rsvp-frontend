import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="invitation">
      <div class="container">
        <div class="invitation-content">
          <div class="invitation-card">
            <h2>Bądźcie z nami!</h2>
            <p class="subtitle-main">Z radością zapraszamy na naszą uroczystość!</p>
            
            <div class="details">
              <div class="detail-item">
                <span class="icon">📅</span>
                <span class="text">7 Sierpnia 2026</span>
              </div>
              <div class="detail-item">
                <span class="icon">🕔</span>
                <span class="text">18:00</span>
              </div>
              <div class="detail-item">
                <span class="icon">📍</span>
                <span class="text">Czarny Staw</span>
              </div>
            </div>

            <div class="message">
              <p>Chcemy, abyście byli z nami w ten wyjątkowy dzień.</p>
              <p class="rsvp-deadline">Prosimy o potwierdzenie swojego przybycia do <strong>7 czerwca 2026</strong>.</p>
              <p class="thanks">Z góry dziękujemy i z niecierpliwością czekamy na wspólną celebrację!</p>
            </div>

            <h1 class="names">Anna & Mateusz</h1>
          </div>
          <div class="couple-photo">
            <img src="/assets/images/couple-round.png" alt="Para młoda">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .invitation {
      padding: 5rem 0;
      background: #f4f7f2;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .invitation-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4rem;
    }

    .invitation-card {
      flex: 1;
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.8rem;
      margin-bottom: 1rem;
      color: #87a878;
    }

    .subtitle-main {
      font-family: 'Lato', sans-serif;
      font-size: 1.2rem;
      margin-bottom: 2.5rem;
      color: #555;
      font-style: italic;
    }

    .details {
      margin: 2.5rem 0;
      padding: 2rem;
      background: #f4f7f2;
      border-radius: 8px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 1rem 0;
      font-family: 'Lato', sans-serif;
      font-size: 1.1rem;
    }

    .detail-item .icon {
      font-size: 1.5rem;
    }

    .detail-item .text {
      font-weight: 600;
      color: #333;
    }

    .message {
      margin: 2.5rem 0;
    }

    .message p {
      font-family: 'Lato', sans-serif;
      margin: 1rem 0;
      color: #555;
      line-height: 1.8;
    }

    .rsvp-deadline {
      color: #87a878 !important;
      font-size: 1.05rem;
      margin: 1.5rem 0 !important;
    }

    .rsvp-deadline strong {
      font-weight: 700;
    }

    .thanks {
      font-style: italic;
      color: #666 !important;
    }

    .names {
      font-family: 'Playfair Display', serif;
      font-size: 3rem;
      margin-top: 2rem;
      color: #87a878;
      font-weight: 400;
    }

    .couple-photo {
      flex: 1;
      max-width: 450px;
    }

    .couple-photo img {
      width: 100%;
      border-radius: 50%;
      box-shadow: 0 10px 40px rgba(135, 168, 120, 0.3);
      border: 8px solid white;
    }

    @media (max-width: 968px) {
      .invitation-content {
        flex-direction: column;
        gap: 2rem;
      }

      .invitation-card {
        padding: 2rem;
      }

      h2 {
        font-size: 2.2rem;
      }

      .names {
        font-size: 2.2rem;
      }
    }
  `]
})
export class InvitationComponent {}
