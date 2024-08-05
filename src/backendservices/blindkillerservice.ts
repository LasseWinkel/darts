import { backendUrl } from "../environment";
import { Lives } from "../types/lives";

export class BlindKillerService {
  public static async resetBlindKiller(): Promise<void> {
    this.setNumberOfLives(0);
    for (let i = 0; i < 21; i++) {
      BlindKillerService.setLives({
        field: i,
        lives: 0,
      });
    }
    this.setGameStarted(false);
  }

  public static async fetchNumberOfLives(): Promise<number> {
    try {
      const response = await fetch(`${backendUrl}/blindkiller/numberoflives`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: number = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching players:", error);
      return 0;
    }
  }

  public static async setNumberOfLives(numberOfLives: number): Promise<number> {
    try {
      const response = await fetch(`${backendUrl}/blindkiller/numberoflives`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numberOfLives),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: { message: string; newValue: number } = await response.json();
      return data.newValue;
    } catch (error) {
      console.error("Error setting number:", error);
      return 0;
    }
  }

  public static async getCurrentLives(): Promise<Lives[]> {
    try {
      const response = await fetch(`${backendUrl}/blindkiller/lives`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Lives[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching lives:", error);
      return [];
    }
  }

  public static async setLives(lives: Lives): Promise<Lives[]> {
    try {
      const response = await fetch(
        `${backendUrl}/blindkiller/lives/${lives.field}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lives),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Lives[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error setting number:", error);
      return [];
    }
  }

  public static async getGameStarted(): Promise<boolean> {
    try {
      const response = await fetch(`${backendUrl}/blindkiller/gamestarted`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: boolean = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching players:", error);
      return false;
    }
  }

  public static async setGameStarted(gameStarted: boolean): Promise<boolean> {
    try {
      const response = await fetch(`${backendUrl}/blindkiller/gamestarted`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameStarted),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: boolean = await response.json();
      return data;
    } catch (error) {
      console.error("Error setting number:", error);
      return false;
    }
  }
}
