import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from "@angular/forms";

import { Routes, RouterModule} from "@angular/router";

import { RecordsService } from './service/records.service';
import { StatisticsService } from './service/statistics.service';

import {AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { StatisticsComponent } from './components/statistics/statistics.component';
import { RecordsComponent } from './components/records/records.component';
import { GameComponent } from './components/game/game.component';
import {  BoardFormComponent } from './components/game/board-form/board-form.component';
import {  GameplayContainerComponent } from './components/game/gameplay-container/gameplay-container.component';
import {    MinesCounterComponent } from './components/game/gameplay-container/mines-counter/mines-counter.component';
import {    AnnouncerComponent } from './components/game/gameplay-container/announcer/announcer.component';
import {    BoardComponent } from './components/game/gameplay-container/board/board.component';
import {      FieldComponent } from './components/game/gameplay-container/board/field/field.component';

import { FooterComponent } from './components/footer/footer.component';

import { environment } from "../environments/environment";

const appRoutes: Routes = [
  {path: 'MineSweeper/game', component: GameComponent, data: { animation: "game" }},
  {path: 'MineSweeper/statistics', component: StatisticsComponent, data: { animation: "statistics" }},
  {path: 'MineSweeper/records', component: RecordsComponent, data: { animation: "records" }},
  {path: '**', redirectTo: 'MineSweeper/game'}
]

@NgModule({
  declarations: [
    AppComponent,
    BoardFormComponent,
    GameplayContainerComponent,
    BoardComponent,
    FieldComponent,
    StatisticsComponent,
    MinesCounterComponent,
    AnnouncerComponent,
    RecordsComponent,
    HeaderComponent,
    FooterComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // firestore
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    // routes
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    RecordsService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
