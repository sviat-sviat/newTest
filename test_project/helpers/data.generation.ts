export class DataGeneration {
    getRandomNumber(max: number): number {
      return Math.floor(1 + Math.random() * Math.floor(max));
    }
  
    getRandomString(characterLength: number): string {
      let randomText = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < characterLength; i++) {
        randomText += possible.charAt(
          Math.floor(Math.random() * possible.length)
        );
      }
      return randomText;
    }
  
    getRandomEmail(): string {
      return `autoTest${this.getRandomString(6)}@mail.com`;
    }
  }