import { backendUrl } from "../environment";
import { PlayerType } from "../types";

export class PlayerService {
  public static async fetchPlayers(): Promise<PlayerType[]> {
    try {
      const response = await fetch(`${backendUrl}/players`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: PlayerType[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching players:", error);
      return [];
    }
  }

  public static async addPlayer(player: PlayerType): Promise<PlayerType[]> {
    try {
      const response = await fetch(`${backendUrl}/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: PlayerType[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding player:", error);
      return [];
    }
  }

  public static async updatePlayer(player: PlayerType): Promise<PlayerType[]> {
    try {
      const response = await fetch(`${backendUrl}/players/${player.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: PlayerType[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding player:", error);
      return [];
    }
  }

  public static async deletePlayer(player: PlayerType): Promise<PlayerType[]> {
    try {
      const response = await fetch(`${backendUrl}/players/${player.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: PlayerType[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting all players:", error);
      return [];
    }
  }
}
