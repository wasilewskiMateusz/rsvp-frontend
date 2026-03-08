import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="story">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <h2>Nasza Historia</h2>
            <p class="intro">
              Poznaliśmy się przez znajomych w klubie — spontanicznie i bez wielkich oczekiwań. 
              Po tamtej nocy nasze drogi na chwilę się rozeszły, ale los chciał, byśmy spotkali się ponownie. 
              I właśnie wtedy wszystko zaczęło nabierać znaczenia.
            </p>
            <p>
              Zaczęliśmy budować naszą relację powoli, na mocnym fundamencie przyjaźni — i to ona sprawiła, 
              że tak dobrze czujemy się w swoim towarzystwie. Znamy się jak nikt inny: potrafimy śmiać się 
              i płakać razem, wspierać się w każdej chwili i tworzyć niezapomniane wspomnienia.
            </p>
            <p>
              Oboje jesteśmy ekstrawertykami, lubimy urozmaicać sobie wolny czas, dlatego nigdy nie jest nam 
              ze sobą nudno. Łączy nas miłość do podróży, silne więzi rodzinne oraz ogromne serce do zwierząt 
              — ale tak naprawdę łączy nas coś znacznie więcej: poczucie bezpieczeństwa, zaufanie i świadomość, 
              że przy tej drugiej osobie zawsze możemy być sobą.
            </p>
            <p class="highlight">
              Po ośmiu wspólnych latach wiemy, że przyjaźń stała się miłością, a miłość domem, 
              do którego codziennie chcemy wracać — i właśnie to zaprowadziło nas aż tutaj 💍✨
            </p>
          </div>
          <div class="story-image">
            <img src="/assets/images/story-photo.jpg" alt="Para młoda">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .story {
      padding: 5rem 0;
      background: white;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .story-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: #87a878;
    }

    p {
      font-family: 'Lato', sans-serif;
      line-height: 1.9;
      color: #555;
      margin-bottom: 1.5rem;
      font-size: 1.05rem;
      text-align: justify;
    }

    p.intro {
      font-size: 1.1rem;
      color: #333;
      font-weight: 500;
    }

    p.highlight {
      font-style: italic;
      color: #87a878;
      font-size: 1.1rem;
      font-weight: 500;
      margin-top: 2rem;
      border-left: 3px solid #87a878;
      padding-left: 1.5rem;
    }

    .story-image img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }

    @media (max-width: 968px) {
      .story-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      h2 {
        font-size: 2rem;
      }
      
      p {
        text-align: left;
      }
    }
  `]
})
export class StoryComponent {}
