export class CustomError extends Error {
  codeName: string;
  constructor(codeName: string) {
    super();
    this.codeName = codeName;
  }
}
