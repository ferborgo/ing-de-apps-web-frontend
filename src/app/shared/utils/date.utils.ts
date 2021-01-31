export enum days {
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
}

export enum months {
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
}

export class DateUtils {


  static generarTitulo(start: Date | string, end: Date | string): string {

    if (typeof start == 'string') start = new Date(start);
    if (typeof end == 'string') end = new Date(end);

    const dia = DateUtils.getDay(start.getDay());
    return `${dia} de ${start.getHours()}${DateUtils.getMinutes(start)} a ${end.getHours()}${DateUtils.getMinutes(end)}`;
  }

  static generarTituloConMes(start: Date | string, end: Date | string): string {
    if (typeof start == 'string') start = new Date(start);
    if (typeof end == 'string') end = new Date(end);

    const dia = DateUtils.getDay(start.getDay());
    const fecha = start.getDate();
    const mes = DateUtils.getMonth(start.getMonth());
    return `${dia} ${fecha} de ${mes} de ${start.getHours()}${DateUtils.getMinutes(start)} a ${end.getHours()}${DateUtils.getMinutes(end)}`;
  }

  private static getDay(num: number): string {
    return days[num];
  }

  private static getMonth(num: number): string {
    return months[num];
  }

  private static getMinutes(date: Date): string {
    const minutes = date.getMinutes();
    if (minutes === 0) {
      return '';
    }
    return `:${minutes.toString()}`;
  }
}
