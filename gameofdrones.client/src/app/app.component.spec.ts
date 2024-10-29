import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameService } from './services/game.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  let gameService: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [GameService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    gameService = TestBed.inject(GameService);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should start a game and fetch players', () => {
    component.player1Name = 'Player 1';
    component.player2Name = 'Player 2';

    component.startGame();

    const startGameRequest = httpMock.expectOne('/api/game/start-game');
    expect(startGameRequest.request.method).toEqual('POST');
    startGameRequest.flush({ player1: { id: 1, name: 'Player 1' }, player2: { id: 2, name: 'Player 2' } });

    const fetchPlayersRequest = httpMock.expectOne('/api/game/results');
    expect(fetchPlayersRequest.request.method).toEqual('GET');
    fetchPlayersRequest.flush([{ id: 1, name: 'Player 1' }, { id: 2, name: 'Player 2' }]);

    expect(component.players.length).toBe(2);
    expect(component.players[0].name).toBe('Player 1');
  });
});
