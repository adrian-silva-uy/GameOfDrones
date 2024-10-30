import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Game of Drones';
  player1Name = '';
  player2Name = '';
  players: any[] = [];
  gameResult = '';
  player1Id: number | null = null;
  player2Id: number | null = null;
  player1Move: string | null = null;
  player2Move: string | null = null;
  topWinners: any[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.loadPlayers();
    this.loadTopWinners();
  }

  loadPlayers() {
    this.gameService.getPlayers().subscribe(
      (players: any) => {
        this.players = players;
        if (players.length >= 2) {
          this.player1Id = players[0].id;
          this.player2Id = players[1].id;
        }
      },
      (error: any) => {
        console.error('Error fetching players:', error);
      }
    );
  }

  loadTopWinners() {
    this.gameService.getTopWinners().subscribe(
      (winners: any) => {
        this.topWinners = winners.filter((winner: any) => winner.wins >= 1);
      },
      (error: any) => {
        console.error('Error fetching top winners:', error);
      }
    );
  }

  selectPlayer(player: any) {
    if (!this.player1Id) {
      this.player1Id = player.id;
      this.player1Name = player.name; 
    } else if (!this.player2Id) {
      this.player2Id = player.id;
      this.player2Name = player.name; 
    }
  }

  startGame() {
    this.gameService.startGame(this.player1Name, this.player2Name).subscribe(
      (response: any) => {
        this.players = [response.player1, response.player2];
        this.player1Id = response.player1.id;
        this.player2Id = response.player2.id;
        this.resetGame(); 
      },
      (error: any) => {
        console.error('Error starting game:', error);
      }
    );
  }

  resetGame() {
    this.player1Move = null;
    this.player2Move = null;
    this.gameResult = '';
  }

  onPlayerMoveSelected(playerId: number, move: string) {
    if (playerId === this.player1Id) {
      this.player1Move = move;
    } else if (playerId === this.player2Id) {
      this.player2Move = move;
    }
  }

  playRound() {
    if (this.player1Id && this.player2Id && this.player1Move && this.player2Move) {
      this.gameService.playRound(this.player1Id, this.player2Id, this.player1Move, this.player2Move)
        .subscribe(
          (roundResult) => {
            if (roundResult.winner === "Player 1 Wins") {
              this.gameResult = `${roundResult.player1.name} wins! (Played on: ${new Date(roundResult.datePlayed).toLocaleString()})`;
            } else if (roundResult.winner === "Player 2 Wins") {
              this.gameResult = `${roundResult.player2.name} wins! (Played on: ${new Date(roundResult.datePlayed).toLocaleString()})`;
            } else {
              this.gameResult = `Draw (Played on: ${new Date(roundResult.datePlayed).toLocaleString()})`;
            }
          },
          (error) => {
            console.error('Error playing round:', error);
            this.gameResult = 'Error occurred while playing the round.';
          }
        );
    }
  }

}
