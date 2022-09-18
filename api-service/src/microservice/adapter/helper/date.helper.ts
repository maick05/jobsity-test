export class DateHelper {
  static GetServerDateNow() {
    const dateLocal = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    ).toISOString();
    return new Date(dateLocal);
  }
}
