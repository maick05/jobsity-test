import { StringHelper } from './string.helper';

export class DateHelper {
  static GetServerDateNow() {
    const dateLocal = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    ).toISOString();
    return new Date(dateLocal);
  }

  static SetAddDate(setTime: string, date: Date = null): Date {
    const dateLocal = date ?? this.GetServerDateNow();
    const setValue = StringHelper.ExtractNumbers(setTime);
    dateLocal.setHours(dateLocal.getHours() + setValue);

    return dateLocal;
  }
}
