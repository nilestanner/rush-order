// https://stackoverflow.com/a/2450976/14308614
function shuffle(array: any) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/**
 * Singleton of the GameState
 */
export class GameState {
  static currentRoomIndex: number;
  static roomOrder: Array<string>;
  
  static initialize(roomSceneNames: Array<string>) {
    this.roomOrder = [...roomSceneNames];
    shuffle(this.roomOrder);
    this.currentRoomIndex = 0;
  }

  static currentRoom() {
    return this.roomOrder[this.currentRoomIndex];
  }

  /**
   * Updates the game state to be in the next room.
   * 
   * Returns the scene name of the previous room. Null indicates that there is no next room
   */
  static nextRoom(): string | null {
    if (this.currentRoomIndex >= this.roomOrder.length - 1) {
      return null
    }
    this.currentRoomIndex++;
    return this.roomOrder[this.currentRoomIndex];
  }

  /**
   * Updates the game state to be in the previous room.
   * 
   * Returns the scene name of the previous room. Null indicates that there is no previous room
   */
  static previousRoom(): string | null {
    if (this.currentRoomIndex === 0) {
      return null
    }
    this.currentRoomIndex--;
    return this.roomOrder[this.currentRoomIndex];
  }
}
