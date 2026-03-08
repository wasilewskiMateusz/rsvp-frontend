import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HeroComponent } from './components/hero/hero.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { LocationComponent } from './components/location/location.component';
import { StoryComponent } from './components/story/story.component';
import { GuideComponent } from './components/guide/guide.component';
import { RsvpFormComponent } from './components/rsvp-form/rsvp-form.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    InvitationComponent,
    LocationComponent,
    StoryComponent,
    GuideComponent,
    RsvpFormComponent,
    GalleryComponent
  ],
  template: `
    <div class="wedding-page">
      <app-hero></app-hero>
      <app-invitation></app-invitation>
      <app-location></app-location>
      <app-story></app-story>
      <app-guide></app-guide>
      <app-rsvp-form></app-rsvp-form>
      <app-gallery></app-gallery>
    </div>
  `,
  styles: [`
    .wedding-page {
      width: 100%;
      overflow-x: hidden;
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}
}
