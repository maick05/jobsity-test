export class StringHelper {
  static ExtractNumbers(str: string): number {
    return parseInt(str.replace(/\D/g, ''));
  }
}
