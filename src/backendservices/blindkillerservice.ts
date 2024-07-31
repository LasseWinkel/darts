import { backendUrl } from "../environment";
import { Lives } from "../types/lives";

export class BlindKillerService {
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

  public static async deleteNumberOfLives(): Promise<void> {
    try {
      const response = await fetch(`${backendUrl}/blindkiller/numberoflives`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error deleting number:", error);
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

  public static async deleteLives(): Promise<void> {
    try {
      const response = await fetch(`${backendUrl}/blindkiller/numberoflives`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error deleting number:", error);
    }
  }

  public static async getGameStarted(): Promise<boolean> {
    try {
      const response = await fetch(`${backendUrl}/blindkiller/gamestarted`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: number = await response.json();
      return data === 1 ? true : false;
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
        body: JSON.stringify(gameStarted ? 1 : 0),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: number = await response.json();
      return data === 1 ? true : false;
    } catch (error) {
      console.error("Error setting number:", error);
      return false;
    }
  }
}
