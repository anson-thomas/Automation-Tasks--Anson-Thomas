export default class Random {
  static getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static getRandomLetters(length: number) {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let str = "";

    for (let i = 0; i < length; i++) {
      str += letters[Math.floor(Math.random() * letters.length)];
    }

    return str;
  }

  static getRandomAlphaNumeric(length: number) {
    const characters =
      "abcdefghijklmnopqrstuvwxyz0123456789";
    let str = "";

    for (let i = 0; i < length; i++) {
      str += characters[Math.floor(Math.random() * characters.length)];
    }

    return str;
  }

  static getRandomYopmail() {
    return `playground_${this.getRandomAlphaNumeric(8)}@yopmail.com`;
  }
}