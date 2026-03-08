import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RsvpService, Guest, RsvpResponse } from '../../services/rsvp.service';

@Component({
  selector: 'app-rsvp-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="rsvp" id="rsvp">
      <div class="container">
        <h2>Daj znać, że będziesz z nami!</h2>

        <div *ngIf="loading" class="loading">
          Ładowanie...
        </div>

        <div *ngIf="error" class="error">
          {{ error }}
        </div>

        <div *ngIf="!loading && !error && guests.length > 0" class="form-container">
          
          <!-- Przycisk dodawania partnera (tylko dla PLUS_ONE) -->
          <div *ngIf="canAddPlusOne && guests.length === 1 && !showAddPartnerForm" class="add-partner-section">
            <button type="button" class="add-partner-btn" (click)="showAddPartnerForm = true">
              + Dodaj partnera
            </button>
          </div>

          <!-- Formularz dodawania partnera -->
          <div *ngIf="showAddPartnerForm" class="partner-form">
            <h3>Dodaj partnera</h3>
            <div class="form-row">
              <input 
                type="text" 
                [(ngModel)]="partnerFirstName" 
                placeholder="Imię"
                class="partner-input">
              <input 
                type="text" 
                [(ngModel)]="partnerLastName" 
                placeholder="Nazwisko"
                class="partner-input">
            </div>
            <div class="form-actions">
              <button type="button" class="btn-confirm" (click)="addPartner()">Dodaj</button>
              <button type="button" class="btn-cancel" (click)="cancelAddPartner()">Anuluj</button>
            </div>
            <div *ngIf="addPartnerError" class="error">{{ addPartnerError }}</div>
          </div>

          <form (ngSubmit)="onSubmit()" #rsvpForm="ngForm">
            
            <div *ngFor="let guest of guests; let i = index" class="guest-card">
              <div class="guest-header">
                <h3>
                  {{ guest.firstName }} {{ guest.lastName }}
                </h3>
                
                <!-- Przycisk usuwania partnera (tylko dla dodanego partnera) -->
                <button 
                  *ngIf="canAddPlusOne && guest.displayOrder === 2"
                  type="button"
                  class="remove-partner-btn"
                  (click)="removePartner(guest.id)">
                  Usuń
                </button>
              </div>

              <div class="form-group">
                <label>Czy będziesz obecny/a?</label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input 
                      type="radio" 
                      [name]="'attending-' + guest.id" 
                      [value]="true"
                      [(ngModel)]="guestResponses[i].isAttending"
                      required>
                    <span>Będę</span>
                  </label>
                  <label class="radio-label">
                    <input 
                      type="radio" 
                      [name]="'attending-' + guest.id" 
                      [value]="false"
                      [(ngModel)]="guestResponses[i].isAttending"
                      required>
                    <span>Nie będę</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label>Czy będziesz na poprawinach?</label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input 
                      type="radio" 
                      [name]="'poprawiny-' + guest.id" 
                      [value]="true"
                      [(ngModel)]="guestResponses[i].attendingPoprawiny">
                    <span>Będę</span>
                  </label>
                  <label class="radio-label">
                    <input 
                      type="radio" 
                      [name]="'poprawiny-' + guest.id" 
                      [value]="false"
                      [(ngModel)]="guestResponses[i].attendingPoprawiny">
                    <span>Nie będę</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label [for]="'allergies-' + guest.id">Alergie pokarmowe</label>
                <textarea 
                  [id]="'allergies-' + guest.id"
                  [name]="'allergies-' + guest.id"
                  [(ngModel)]="guestResponses[i].allergies"
                  placeholder="Proszę wpisać alergie (jeśli nie masz, zostaw puste)"
                  rows="3">
                </textarea>
              </div>
            </div>

            <div *ngIf="submitError" class="error">
              {{ submitError }}
            </div>

            <div *ngIf="submitSuccess" class="success">
              Dziękujemy! Twoja odpowiedź została zapisana.
            </div>

            <button 
              type="submit" 
              class="submit-btn"
              [disabled]="!rsvpForm.valid || submitting">
              {{ submitting ? 'Wysyłanie...' : 'Potwierdź obecność' }}
            </button>
          </form>
        </div>

        <div *ngIf="!loading && !error && guests.length === 0" class="no-invitation">
          Nie znaleziono zaproszenia. Sprawdź czy link jest poprawny.
        </div>
      </div>
    </section>
  `,
  styles: [`
    .rsvp {
      padding: 5rem 0;
      background: white;
    }

    .container {
      max-width: 800px;
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

    .loading, .error, .no-invitation {
      text-align: center;
      padding: 2rem;
      font-family: 'Lato', sans-serif;
    }

    .error {
      color: #d32f2f;
      background: #ffebee;
      border-radius: 8px;
      margin-bottom: 1rem;
      padding: 1rem;
    }

    .success {
      color: #388e3c;
      background: #e8f5e9;
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem 0;
      text-align: center;
    }

    .add-partner-section {
      text-align: center;
      margin-bottom: 2rem;
    }

    .add-partner-btn {
      padding: 0.75rem 2rem;
      background: white;
      color: #87a878;
      border: 2px solid #87a878;
      border-radius: 4px;
      font-family: 'Lato', sans-serif;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .add-partner-btn:hover {
      background: #87a878;
      color: white;
    }

    .partner-form {
      background: #f4f7f2;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border: 2px dashed #87a878;
    }

    .partner-form h3 {
      font-family: 'Playfair Display', serif;
      margin-bottom: 1rem;
      color: #87a878;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .partner-input {
      padding: 0.75rem;
      font-family: 'Lato', sans-serif;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-confirm, .btn-cancel {
      padding: 0.5rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-family: 'Lato', sans-serif;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-confirm {
      background: #87a878;
      color: white;
    }

    .btn-confirm:hover {
      background: #6b8e5f;
    }

    .btn-cancel {
      background: #ddd;
      color: #666;
    }

    .btn-cancel:hover {
      background: #ccc;
    }

    .guest-card {
      background: #f4f7f2;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border: 2px solid #87a878;
    }

    .guest-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .guest-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      color: #333;
      margin: 0;
    }

    .remove-partner-btn {
      padding: 0.5rem 1rem;
      background: #d32f2f;
      color: white;
      border: none;
      border-radius: 4px;
      font-family: 'Lato', sans-serif;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s;
    }

    .remove-partner-btn:hover {
      background: #b71c1c;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      font-family: 'Lato', sans-serif;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #555;
    }

    .radio-group {
      display: flex;
      gap: 2rem;
    }

    .radio-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: normal;
    }

    .radio-label input[type="radio"] {
      margin-right: 0.5rem;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    textarea {
      width: 100%;
      padding: 0.75rem;
      font-family: 'Lato', sans-serif;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: vertical;
    }

    textarea:focus {
      outline: none;
      border-color: #87a878;
    }

    .submit-btn {
      width: 100%;
      padding: 1rem 2rem;
      background: #87a878;
      color: white;
      border: none;
      border-radius: 4px;
      font-family: 'Lato', sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    .submit-btn:hover:not(:disabled) {
      background: #6b8e5f;
    }

    .submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      h2 {
        font-size: 2rem;
      }
      .guest-card {
        padding: 1.5rem;
      }
      .radio-group {
        flex-direction: column;
        gap: 1rem;
      }
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RsvpFormComponent implements OnInit {
  token: string = '';
  guests: Guest[] = [];
  guestResponses: RsvpResponse[] = [];
  canAddPlusOne: boolean = false;
  
  loading: boolean = true;
  error: string = '';
  submitting: boolean = false;
  submitError: string = '';
  submitSuccess: boolean = false;

  // Partner form
  showAddPartnerForm: boolean = false;
  partnerFirstName: string = '';
  partnerLastName: string = '';
  addPartnerError: string = '';

  constructor(
    private route: ActivatedRoute,
    private rsvpService: RsvpService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') || '';
      if (this.token) {
        this.loadInvitation();
      } else {
        this.loading = false;
        this.error = 'Brak tokenu zaproszenia';
      }
    });
  }

  loadInvitation() {
    this.loading = true;
    this.error = '';

    this.rsvpService.getInvitation(this.token).subscribe({
      next: (invitation) => {
        this.guests = invitation.guests;
        this.canAddPlusOne = invitation.canAddPlusOne;
        
        // Inicjalizuj responses dla każdego gościa
        this.guestResponses = this.guests.map(guest => ({
          guestId: guest.id,
          isAttending: guest.isAttending !== undefined ? guest.isAttending : null as any,
          attendingPoprawiny: guest.attendingPoprawiny !== undefined ? guest.attendingPoprawiny : null as any,
          allergies: guest.allergies || ''
        }));

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Nie udało się załadować zaproszenia. Sprawdź czy link jest poprawny.';
        console.error('Error loading invitation:', err);
      }
    });
  }

  addPartner() {
    if (!this.partnerFirstName.trim() || !this.partnerLastName.trim()) {
      this.addPartnerError = 'Proszę wypełnić imię i nazwisko';
      return;
    }

    this.addPartnerError = '';

    this.rsvpService.addPartner(this.token, this.partnerFirstName, this.partnerLastName).subscribe({
      next: (response) => {
        // Dodaj nowego gościa do listy
        const newGuest: Guest = {
          id: response.guest.id,
          firstName: response.guest.firstName,
          lastName: response.guest.lastName,
          isChild: false,
          displayOrder: response.guest.displayOrder
        };
        
        this.guests.push(newGuest);
        
        // Dodaj pusty response dla nowego gościa
        this.guestResponses.push({
          guestId: newGuest.id,
          isAttending: null as any,
          attendingPoprawiny: null as any,
          allergies: ''
        });

        // Reset formularza
        this.showAddPartnerForm = false;
        this.partnerFirstName = '';
        this.partnerLastName = '';
      },
      error: (err) => {
        this.addPartnerError = err.error?.error || 'Nie udało się dodać partnera';
        console.error('Error adding partner:', err);
      }
    });
  }

  cancelAddPartner() {
    this.showAddPartnerForm = false;
    this.partnerFirstName = '';
    this.partnerLastName = '';
    this.addPartnerError = '';
  }

  removePartner(guestId: number) {
    if (!confirm('Czy na pewno chcesz usunąć partnera?')) {
      return;
    }

    this.rsvpService.removePartner(this.token, guestId).subscribe({
      next: () => {
        // Usuń z listy gości
        const guestIndex = this.guests.findIndex(g => g.id === guestId);
        if (guestIndex > -1) {
          this.guests.splice(guestIndex, 1);
          this.guestResponses.splice(guestIndex, 1);
        }
      },
      error: (err) => {
        alert('Nie udało się usunąć partnera');
        console.error('Error removing partner:', err);
      }
    });
  }

  onSubmit() {
    // Walidacja - sprawdź czy wszystkie pola isAttending są wypełnione
    const allFilled = this.guestResponses.every(r => r.isAttending !== null);
    
    if (!allFilled) {
      this.submitError = 'Proszę wypełnić wszystkie wymagane pola';
      return;
    }

    this.submitting = true;
    this.submitError = '';
    this.submitSuccess = false;

    this.rsvpService.submitRsvp(this.token, this.guestResponses).subscribe({
      next: (response) => {
        this.submitting = false;
        this.submitSuccess = true;
        this.submitError = '';
        
        // Scroll to success message
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      },
      error: (err) => {
        this.submitting = false;
        this.submitError = 'Nie udało się zapisać odpowiedzi. Spróbuj ponownie.';
        console.error('Error submitting RSVP:', err);
      }
    });
  }
}
