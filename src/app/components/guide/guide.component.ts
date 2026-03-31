import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="guide">
      <div class="container">
        <h2>Przewodnik Gościa</h2>
        
        <div class="guide-grid">
          <div class="guide-card">
            <div class="icon">👔</div>
            <h3>Dress Code</h3>
            <p><strong>Wesele:</strong> Elegancki strój</p>
            <p class="separator">• • •</p>
            <p><strong>Poprawiny:</strong> Elegancko, ale na luzie!</p>
          </div>

          <div class="guide-card">
            <div class="icon">🎁</div>
            <h3>Prezenty</h3>
            <p class="gift-text">
              Największym prezentem jest dla nas Wasza obecność.<br><br>
              To, co najważniejsze, już posiadamy, dlatego zamiast rzeczy materialnych 
              wdzięczni będziemy za drobne wsparcie finansowe na naszą wspólną przyszłość.
            </p>
          </div>

          <div class="guide-card">
            <div class="icon">🏨</div>
            <h3>Noclegi</h3>
            <p class="intro">Dla osób zainteresowanych dysponujemy możliwością rezerwacji pokojów na terenie obiektu.</p>
            <p class="contact-info">W razie zainteresowania prosimy o kontakt z nami – chętnie pomożemy w organizacji noclegu!</p>
          </div>

          <div class="guide-card">
            <div class="icon">📸</div>
            <h3>Wspólny Album</h3>
            <p>Chociaż będziemy mieli obecnego profesjonalnego fotografa, serdecznie zachęcamy Cię do dzielenia się własnymi wspomnieniami w naszym wspólnym albumie na dysku Google.</p>
            <p class="highlight">Twoje ujęcia dodadzą magii temu wyjątkowemu dniu!</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .guide {
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

    .guide-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .guide-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      transition: transform 0.3s, box-shadow 0.3s;
      display: flex;
      flex-direction: column;
    }

    .guide-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(135, 168, 120, 0.2);
    }

    .icon {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
    }

    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      margin-bottom: 1.5rem;
      color: #87a878;
    }

    p {
      font-family: 'Lato', sans-serif;
      color: #555;
      line-height: 1.8;
      margin-bottom: 1rem;
      font-size: 1rem;
    }

    p.intro {
      font-size: 1.05rem;
      margin-bottom: 1.5rem;
    }

    .price-list {
      margin-top: 1.5rem;
      text-align: left;
    }

    .price-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      margin: 0.5rem 0;
      background: #f4f7f2;
      border-radius: 6px;
    }

    .room-type {
      font-family: 'Lato', sans-serif;
      color: #333;
      font-size: 0.95rem;
    }

    .price {
      font-weight: 700;
      color: #87a878;
      font-size: 1.1rem;
    }

    .separator {
      color: #87a878;
      font-size: 1.5rem;
      margin: 1rem 0;
      letter-spacing: 0.5rem;
    }

    p.highlight {
      font-style: italic;
      color: #87a878;
      font-weight: 500;
      margin-top: 1rem;
    }

    p.gift-text {
      line-height: 1.9;
      text-align: center;
    }

    p strong {
      color: #333;
      font-weight: 600;
    }

    @media (max-width: 1200px) {
      .guide-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .guide-grid {
        grid-template-columns: 1fr;
      }

      h2 {
        font-size: 2.2rem;
      }

      .guide-card {
        padding: 1.5rem;
      }
    }
  `]
})
export class GuideComponent {}