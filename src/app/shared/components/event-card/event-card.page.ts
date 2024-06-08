import { Component, Input, OnInit } from '@angular/core';
import { ISocialEvent } from '../../interfaces/social-event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.page.html',
  styleUrls: ['./event-card.page.scss'],
})
export class EventCardPage implements OnInit {
  @Input() event!: ISocialEvent;
  @Input() edit = false;

  constructor() {}

  ngOnInit() {}
}
