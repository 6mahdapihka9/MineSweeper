import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { GameplayContainerComponent } from './gameplay-container/gameplay-container.component';
import { BoardComponent } from './gameplay-container/board/board.component';
import { FieldComponent } from './gameplay-container/board/field/field.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MinesCounterComponent } from './gameplay-container/mines-counter/mines-counter.component';
import { AnnouncerComponent } from './gameplay-container/announcer/announcer.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardFormComponent,
    GameplayContainerComponent,
    BoardComponent,
    FieldComponent,
    StatisticsComponent,
    MinesCounterComponent,
    AnnouncerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
