import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-announcer',
  templateUrl: './announcer.component.html',
  styleUrls: ['./announcer.component.css']
})

export class AnnouncerComponent{
  @Input() userLost: boolean|undefined
}
