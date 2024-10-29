import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { MoveSelectorComponent } from './components/move-selector/move-selector.component';
import { ScoreboardComponent } from './components/score-board/score-board.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    MoveSelectorComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
