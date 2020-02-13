import * as moment from 'moment';

export function getDateFromString(dateStr: string, format: string = 'DD/MM/YYYY'): Date {
  if (dateStr === null) return null;
  return moment(dateStr, format).toDate();
}

export function getFormattedDate(date: any, format: string = 'DD/MM/YYYY'): string {
  if (date === null) return null;
  if (typeof date === 'string') {
    return date;
  } else {
    return moment(date).format(format);
  }
}

/*Convert from 2019-10-03 to 03/10/2019 */
export function getFormattedDateFromYYYYMMDDtoDDMMYYYY(date: string): string {
  if (date === null) return null;
  if (date.length !== 10) {
    return null;
  } else {
    let dateSplit = date.split('-');
    return dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[0];
  }
}


/*Convert from 03/10/2019 to 2019-10-03  */
export function getFormattedDateFromDDMMYYYYtoYYYYMMDD(date: string): string {
  if (date === null) return null;
  if (date.length !== 10) {
    return null;
  } else {
    let dateSplit = date.split('/');
    return dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
  }
}

export function getDateRange(dateRangeValueForm: any[]) {
  let dateOk: boolean = dateRangeValueForm !== null && dateRangeValueForm.length > 0;
  return {
    fechaInicio: dateOk ? getFormattedDate(dateRangeValueForm[0]) : null,
    fechaFin: dateOk ? getFormattedDate(dateRangeValueForm[1]) : null
  }
}

export function getFormattedDateRangePicker(fechaIntervalo: string[], format: string = 'DD/MM/YYYY'): string[] {
  let fechaFormateada = new Array();
  fechaFormateada.push(moment(fechaIntervalo[0]).format(format));
  fechaFormateada.push(moment(fechaIntervalo[1]).format(format));
  return fechaFormateada;
}


export function getDateSystemToFile(): string {
  let hoy = new Date();
  let dd = hoy.getDate();
  let mm = hoy.getMonth() + 1;
  let yyyy = hoy.getFullYear().toString();
  dd = addZero(dd).toString();
  mm = addZero(mm).toString();
  return dd + mm + yyyy;
}


export function addZero(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

/** Mario:
 * Devuelve la cantidad de dias de un rango de fechas
 * @param dateInicio rango de inicio (formato YYYY-MM-DD)
 * @param dateFin rango de fin (formato YYYY-MM-DD)
 * @returns dayDiff cantidad de dias
 **/
export function getDaysInRange(dateInicio: string, dateFin: string): number {
  var diaInicio = moment(getFormattedDateFromDDMMYYYYtoYYYYMMDD(dateInicio));
  var diaFin = moment(getFormattedDateFromDDMMYYYYtoYYYYMMDD(dateFin));
  let dayDiff: number = diaFin.diff(diaInicio, 'days');
  return dayDiff;
}
