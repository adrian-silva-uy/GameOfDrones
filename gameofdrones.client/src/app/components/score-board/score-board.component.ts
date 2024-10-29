import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  template: `
    <div *ngIf="roundResult" class="alert alert-info">
      <h4>Round Result</h4>
      <p>{{ roundResult }}</p>
    </div>
  `,
  styleUrls: ['./score-board.component.css']
})
export class ScoreboardComponent {
  @Input() roundResult: string = '';
}
