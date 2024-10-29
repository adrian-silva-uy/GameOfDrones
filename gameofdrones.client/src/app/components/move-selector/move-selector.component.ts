import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-move-selector',
  template: `
    <div class="move-selector">
      <h3>{{ playerName }}'s Move</h3>
      <button 
        class="btn" 
        [ngClass]="{'btn-primary': selectedMove === 'Rock', 'btn-outline-primary': selectedMove !== 'Rock'}" 
        (click)="selectMove('Rock')">Rock
      </button>
      <button 
        class="btn" 
        [ngClass]="{'btn-primary': selectedMove === 'Paper', 'btn-outline-primary': selectedMove !== 'Paper'}" 
        (click)="selectMove('Paper')">Paper
      </button>
      <button 
        class="btn" 
        [ngClass]="{'btn-primary': selectedMove === 'Scissors', 'btn-outline-primary': selectedMove !== 'Scissors'}" 
        (click)="selectMove('Scissors')">Scissors
      </button>
    </div>
  `,
  styleUrls: ['./move-selector.component.css']
})
export class MoveSelectorComponent {
  @Input() playerName!: string;
  @Output() moveSelected = new EventEmitter<string>();

  selectedMove: string | null = null; 

  selectMove(move: string) {
    this.selectedMove = move; 
    this.moveSelected.emit(move);
  }
}
