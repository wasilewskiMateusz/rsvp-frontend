import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  isChild: boolean;
  displayOrder: number;
  isAttending?: boolean;
  attendingPoprawiny?: boolean;
  allergies?: string;
}

export interface Invitation {
  token: string;
  responded: boolean;
  canAddPlusOne: boolean;
  guests: Guest[];
}

export interface RsvpResponse {
  guestId: number;
  isAttending: boolean;
  attendingPoprawiny?: boolean;
  allergies: string;
}

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  private apiUrl = 'https://rsvp-backend-uxhu.onrender.com/api';

  constructor(private http: HttpClient) { }

  getInvitation(token: string): Observable<Invitation> {
    return this.http.get<Invitation>(`${this.apiUrl}/invitation/${token}`);
  }

  submitRsvp(token: string, responses: RsvpResponse[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/rsvp/${token}`, { responses });
  }

  addPartner(token: string, firstName: string, lastName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/invitation/${token}/add-partner`, {
      firstName,
      lastName
    });
  }

  removePartner(token: string, guestId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/invitation/${token}/remove-partner/${guestId}`);
  }
}