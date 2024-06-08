import { Component, Input, OnInit } from '@angular/core';
import { ISocialEvent } from '../../interfaces/social-event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  @Input() event!: ISocialEvent;

  constructor() {}

  ngOnInit() {}
}
