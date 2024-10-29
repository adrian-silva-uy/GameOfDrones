import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/player';
import { GameResult } from '../../models/game-result';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  player1Name: string = '';
  player2Name: string = '';
  player1Id: number = 0;
  player2Id: number = 0;
  players: Player[] = [];
  roundResult: string = '';
  gameStarted: boolean = false;
  player1Move: string = '';
  player2Move: string = '';
  scoreboard: { player1: number; player2: number } = { player1: 0, player2: 0 };

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    // Cargar jugadores al iniciar el componente
    this.loadPlayers();
  }

  loadPlayers() {
    this.gameService.getPlayers().subscribe((players: Player[]) => {
      this.players = players;
    });
  }

  selectPlayer(playerId: number, playerNumber: number) {
    if (playerNumber === 1) {
      this.player1Id = playerId;
      this.player1Name = this.players.find(player => player.id === playerId)?.name || '';
    } else if (playerNumber === 2) {
      this.player2Id = playerId;
      this.player2Name = this.players.find(player => player.id === playerId)?.name || '';
    }
  }

  startGame() {
    if (this.player1Id && this.player2Id) {
      this.gameStarted = true;
      this.roundResult = '';
      this.scoreboard = { player1: 0, player2: 0 };
    } else {
      alert('Both players must be selected!');
    }
  }

  playRound() {
    if (this.player1Move && this.player2Move) {
      this.gameService.playRound(this.player1Id, this.player2Id, this.player1Move, this.player2Move).subscribe((result: GameResult) => {
        this.roundResult = `${result.winner} wins this round!`;
        if (result.winner === this.player1Name) {
          this.scoreboard.player1++;
        } else if (result.winner === this.player2Name) {
          this.scoreboard.player2++;
        }

        if (this.scoreboard.player1 === 3 || this.scoreboard.player2 === 3) {
          this.roundResult = `${result.winner} wins the game!`;
          this.gameStarted = false; // Reset for a new game
        }

        this.player1Move = '';
        this.player2Move = '';
      });
    } else {
      alert('Both players must select a move!');
    }
  }
}
