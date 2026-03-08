import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  isChild: boolean;
  displayOrder: number;
  isAttending: boolean | null;
  attendingPoprawiny: boolean | null;
  allergies: string | null;
  updatedAt: string | null;
}

interface Invitation {
  invitation_id: number;
  token: string;
  responded: boolean;
  can_add_plus_one: boolean;
  guests: Guest[];
}

interface Stats {
  total_invitations: number;
  responded_invitations: number;
  total_guests: number;
  attending_wedding: number;
  not_attending_wedding: number;
  attending_poprawiny: number;
  not_attending_poprawiny: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-panel">
      <div class="container">
        <h1>Panel Administracyjny - Wesele Anna & Mateusz</h1>
        <p class="subtitle">Tryb tylko do odczytu (Read-only)</p>

        <div *ngIf="loading" class="loading">
          Ładowanie danych...
        </div>

        <div *ngIf="error" class="error">
          {{ error }}
        </div>

        <div *ngIf="!loading && !error && stats">
          <!-- Statystyki -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">{{ stats.total_invitations }}</div>
              <div class="stat-label">Zaproszeń</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ stats.responded_invitations }}</div>
              <div class="stat-label">Odpowiedziało</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ stats.total_guests }}</div>
              <div class="stat-label">Gości (łącznie)</div>
            </div>
            <div class="stat-card highlight">
              <div class="stat-number">{{ stats.attending_wedding }}</div>
              <div class="stat-label">Potwierdzona obecność na weselu</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ stats.not_attending_wedding }}</div>
              <div class="stat-label">Nie będzie na weselu</div>
            </div>
            <div class="stat-card highlight">
              <div class="stat-number">{{ stats.attending_poprawiny }}</div>
              <div class="stat-label">Potwierdzona obecność na poprawinach</div>
            </div>
          </div>

          <!-- Filtry -->
          <div class="filters">
            <button 
              [class.active]="filter === 'all'" 
              (click)="filter = 'all'">
              Wszystkie ({{ invitations.length }})
            </button>
            <button 
              [class.active]="filter === 'responded'" 
              (click)="filter = 'responded'">
              Odpowiedzieli ({{ getRespondedCount() }})
            </button>
            <button 
              [class.active]="filter === 'not-responded'" 
              (click)="filter = 'not-responded'">
              Nie odpowiedzieli ({{ getNotRespondedCount() }})
            </button>
            <button 
              [class.active]="filter === 'attending'" 
              (click)="filter = 'attending'">
              Będą na weselu
            </button>
          </div>

          <!-- Tabela zaproszeń -->
          <div class="invitations-list">
            <div *ngFor="let invitation of getFilteredInvitations()" class="invitation-card">
              <div class="invitation-header">
                <h3>
                  Zaproszenie #{{ invitation.invitation_id }}
                  <span class="badge" [class.responded]="invitation.responded">
                    {{ invitation.responded ? 'Odpowiedziano' : 'Brak odpowiedzi' }}
                  </span>
                  <span *ngIf="invitation.can_add_plus_one" class="badge plus-one">PLUS ONE</span>
                </h3>
                <div class="guest-count">{{ invitation.guests.length }} {{ invitation.guests.length === 1 ? 'osoba' : 'osoby' }}</div>
              </div>

              <div class="guests-table">
                <table>
                  <thead>
                    <tr>
                      <th>Imię i nazwisko</th>
                      <th>Wesele</th>
                      <th>Poprawiny</th>
                      <th>Alergie</th>
                      <th>Data odpowiedzi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let guest of invitation.guests">
                      <td>
                        {{ guest.firstName }} {{ guest.lastName }}
                        <span *ngIf="guest.isChild" class="child-badge">dziecko</span>
                      </td>
                      <td>
                        <span *ngIf="guest.isAttending === true" class="status yes">✓ Będzie</span>
                        <span *ngIf="guest.isAttending === false" class="status no">✗ Nie będzie</span>
                        <span *ngIf="guest.isAttending === null" class="status pending">—</span>
                      </td>
                      <td>
                        <span *ngIf="guest.attendingPoprawiny === true" class="status yes">✓ Będzie</span>
                        <span *ngIf="guest.attendingPoprawiny === false" class="status no">✗ Nie będzie</span>
                        <span *ngIf="guest.attendingPoprawiny === null" class="status pending">—</span>
                      </td>
                      <td>{{ guest.allergies || '—' }}</td>
                      <td>{{ guest.updatedAt ? formatDate(guest.updatedAt) : '—' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="invitation-link">
                <small>Link: {{ getInvitationUrl(invitation.token) }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-panel {
      min-height: 100vh;
      background: #f4f7f2;
      padding: 2rem 0;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-family: 'Lato', sans-serif;
      color: #666;
      margin-bottom: 2rem;
    }

    .loading, .error {
      text-align: center;
      padding: 2rem;
      font-family: 'Lato', sans-serif;
    }

    .error {
      color: #d32f2f;
      background: white;
      border-radius: 8px;
      border: 2px solid #d32f2f;
    }

    /* Statystyki */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .stat-card.highlight {
      background: #87a878;
      color: white;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      font-family: 'Playfair Display', serif;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-family: 'Lato', sans-serif;
      font-size: 0.9rem;
    }

    /* Filtry */
    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filters button {
      padding: 0.75rem 1.5rem;
      background: white;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-family: 'Lato', sans-serif;
      cursor: pointer;
      transition: all 0.3s;
    }

    .filters button:hover {
      border-color: #87a878;
    }

    .filters button.active {
      background: #87a878;
      color: white;
      border-color: #87a878;
    }

    /* Karty zaproszeń */
    .invitation-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .invitation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f4f7f2;
    }

    .invitation-header h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      color: #333;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .badge {
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-family: 'Lato', sans-serif;
      font-weight: 600;
      background: #ddd;
      color: #666;
    }

    .badge.responded {
      background: #87a878;
      color: white;
    }

    .badge.plus-one {
      background: #6b8e5f;
      color: white;
    }

    .guest-count {
      font-family: 'Lato', sans-serif;
      color: #666;
    }

    .child-badge {
      font-size: 0.8rem;
      color: #87a878;
      font-style: italic;
    }

    /* Tabela */
    .guests-table {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Lato', sans-serif;
    }

    th {
      text-align: left;
      padding: 0.75rem;
      background: #f4f7f2;
      font-weight: 600;
      color: #555;
    }

    td {
      padding: 0.75rem;
      border-bottom: 1px solid #f4f7f2;
    }

    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
      display: inline-block;
    }

    .status.yes {
      background: #e8f5e9;
      color: #388e3c;
    }

    .status.no {
      background: #ffebee;
      color: #d32f2f;
    }

    .status.pending {
      background: #f4f7f2;
      color: #999;
    }

    .invitation-link {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #f4f7f2;
    }

    .invitation-link small {
      font-family: 'Lato', sans-serif;
      color: #999;
      word-break: break-all;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 1.8rem;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .filters {
        flex-direction: column;
      }

      .filters button {
        width: 100%;
      }

      table {
        font-size: 0.85rem;
      }

      th, td {
        padding: 0.5rem;
      }
    }
  `]
})
export class AdminComponent implements OnInit {
  private apiUrl = 'https://rsvp-backend-uxhu.onrender.com/api';
  
  loading = true;
  error = '';
  stats: Stats | null = null;
  invitations: Invitation[] = [];
  filter: 'all' | 'responded' | 'not-responded' | 'attending' = 'all';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      if (token) {
        this.loadData(token);
      } else {
        this.error = 'Brak tokenu dostępu';
        this.loading = false;
      }
    });
  }

  loadData(token: string) {
    this.loading = true;
    this.error = '';

    this.http.get<any>(`${this.apiUrl}/admin/${token}`).subscribe({
      next: (data) => {
        this.stats = data.stats;
        this.invitations = data.invitations;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 403) {
          this.error = 'Nieprawidłowy token dostępu';
        } else {
          this.error = 'Nie udało się załadować danych';
        }
        console.error('Error loading admin data:', err);
      }
    });
  }

  getFilteredInvitations(): Invitation[] {
    switch (this.filter) {
      case 'responded':
        return this.invitations.filter(i => i.responded);
      case 'not-responded':
        return this.invitations.filter(i => !i.responded);
      case 'attending':
        return this.invitations.filter(i => 
          i.guests.some(g => g.isAttending === true)
        );
      default:
        return this.invitations;
    }
  }

  getRespondedCount(): number {
    return this.invitations.filter(i => i.responded).length;
  }

  getNotRespondedCount(): number {
    return this.invitations.filter(i => !i.responded).length;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getInvitationUrl(token: string): string {
    return `${window.location.origin}/rsvp/${token}`;
  }
}
