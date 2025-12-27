// src/services/PlayerService.ts
import { PlayerType } from "../types";
import { LocalBackend } from "./localbackend";

export class PlayerService {
  static async fetchPlayers(): Promise<PlayerType[]> {
    return LocalBackend.fetchPlayers();
  }

  static async addPlayer(player: PlayerType): Promise<PlayerType[]> {
    return LocalBackend.addPlayer(player);
  }

  static async updatePlayer(player: PlayerType): Promise<PlayerType[]> {
    return LocalBackend.updatePlayer(player);
  }

  static async deletePlayer(player: PlayerType): Promise<PlayerType[]> {
    return LocalBackend.deletePlayer(player.id);
  }
}
