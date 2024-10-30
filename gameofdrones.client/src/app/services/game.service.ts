import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { GameResult } from '../models/game-result';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  //private apiUrl = 'http://localhost:5277/api/game';

  private apiUrl = '/api/game';

  constructor(private http: HttpClient) { }

  startGame(player1Name: string, player2Name: string): Observable<{ player1: Player; player2: Player }> {
    return this.http.post<{ player1: Player; player2: Player }>(`${this.apiUrl}/start-game`, { player1Name, player2Name });
  }

  //playRound(player1Id: number, player2Id: number, player1Move: string, player2Move: string): Observable<any> {
  //  const body = {
  //    playDto: {
  //      player1Id,
  //      player2Id,
  //      player1Move: player1Move.toUpperCase(),
  //      player2Move: player2Move.toUpperCase() 
  //    }
  //  };
  //  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //  return this.http.post(`${this.apiUrl}/play-round`, body, { headers: headers });
  //}
  playRound(player1Id: number, player2Id: number, player1Move: string, player2Move: string): Observable<any> {
    const body = {
      player1Id,
      player2Id,
      player1Move: player1Move.toUpperCase(),
      player2Move: player2Move.toUpperCase()
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/play-round`, body, { headers: headers });
  }


  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/players`);
  }

  getResults(): Observable<GameResult[]> {
    return this.http.get<GameResult[]>(`${this.apiUrl}/results`);
  }

  determineWinner(player1Move: string, player2Move: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/determine-winner`, { player1Move, player2Move });
  }

  getTopWinners() {
    return this.http.get<any[]>(`${this.apiUrl}/top-players`);
  }
}
