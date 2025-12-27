// src/services/BlindKillerService.ts
import { Lives } from "../types";
import { LocalBackend } from "./localbackend";

export class BlindKillerService {
  static async resetBlindKiller(): Promise<void> {
    LocalBackend.resetBlindKiller();
  }

  static async fetchNumberOfLives(): Promise<number> {
    return LocalBackend.getNumberOfLives();
  }

  static async setNumberOfLives(numberOfLives: number): Promise<number> {
    return LocalBackend.setNumberOfLives(numberOfLives);
  }

  static async getCurrentLives(): Promise<Lives[]> {
    return LocalBackend.getLives();
  }

  static async setLives(lives: Lives): Promise<Lives[]> {
    return LocalBackend.setLives(lives);
  }

  static async getGameStarted(): Promise<boolean> {
    return LocalBackend.getGameStarted();
  }

  static async setGameStarted(gameStarted: boolean): Promise<boolean> {
    return LocalBackend.setGameStarted(gameStarted);
  }
}
