// src/services/LocalBackend.ts
import { PlayerType, Lives } from "../types";

type BlindKillerState = {
  numberOfLives: number;
  lives: Lives[];
  gameStarted: boolean;
};

type AppState = {
  players: PlayerType[];
  blindkiller: BlindKillerState;
};

const STORAGE_KEY = "app_state";

const defaultState: AppState = {
  players: [],
  blindkiller: {
    numberOfLives: 0,
    lives: Array.from({ length: 21 }, (_, i) => ({ field: i, lives: 0 })),
    gameStarted: false,
  },
};

function loadState(): AppState {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : structuredClone(defaultState);
}

function saveState(state: AppState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export const LocalBackend = {
  // -------- Players --------
  fetchPlayers(): PlayerType[] {
    return loadState().players;
  },

  addPlayer(player: PlayerType): PlayerType[] {
    const state = loadState();
    state.players.push(player);
    saveState(state);
    return state.players;
  },

  updatePlayer(player: PlayerType): PlayerType[] {
    const state = loadState();
    state.players = state.players.map((p) => (p.id === player.id ? player : p));
    saveState(state);
    return state.players;
  },

  deletePlayer(playerId: number): PlayerType[] {
    const state = loadState();
    state.players = state.players.filter((p) => p.id !== playerId);
    saveState(state);
    return state.players;
  },

  // -------- Blind Killer --------
  getNumberOfLives(): number {
    return loadState().blindkiller.numberOfLives;
  },

  setNumberOfLives(value: number): number {
    const state = loadState();
    state.blindkiller.numberOfLives = value;
    saveState(state);
    return value;
  },

  getLives(): Lives[] {
    return loadState().blindkiller.lives;
  },

  setLives(lives: Lives): Lives[] {
    const state = loadState();
    state.blindkiller.lives = state.blindkiller.lives.map((l) =>
      l.field === lives.field ? lives : l
    );
    saveState(state);
    return state.blindkiller.lives;
  },

  getGameStarted(): boolean {
    return loadState().blindkiller.gameStarted;
  },

  setGameStarted(value: boolean): boolean {
    const state = loadState();
    state.blindkiller.gameStarted = value;
    saveState(state);
    return value;
  },

  resetBlindKiller(): void {
    const state = loadState();
    state.blindkiller = structuredClone(defaultState.blindkiller);
    state.players = state.players.map((player) => ({
      ...player,
      number: 0,
    }));
    saveState(state);
  },
};
