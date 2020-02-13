import * as moment from 'moment';

export interface ObTime {
  hours: string | number,
  minutes: string | number,
  seconds: string | number
}

export const OB_TIME_UTIL = {
  convertMilliSecondsToObj: (milliseconds: number, wirhFormat: boolean = true): ObTime => {
    const format = val => `0${Math.floor(val)}`.slice(-2);
    const totalSeconds = milliseconds / 1000;
    const hours = totalSeconds / 3600
    const minutes = (totalSeconds % 3600) / 60;
    const seconds = totalSeconds % 60;
    return {
      hours: wirhFormat ? format(hours) : hours,
      minutes: wirhFormat ? format(minutes) : minutes,
      seconds: wirhFormat ? format(seconds) : seconds
    }
  },
  convertTimeToMiliseconds: (time: Date): number => {
    return ((time.getHours() * 3600) + (time.getMinutes() * 60) + time.getSeconds()) * 1000;
  },
  convertMillisecondsToTime: (milliseconds: number): Date => {
    let date = new Date();
    const totalSeconds = milliseconds / 1000;
    const hours = totalSeconds / 3600
    const minutes = (totalSeconds % 3600) / 60;
    const seconds = totalSeconds % 60;
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
  },
  convertStringToTime: (timeStr: string, format: string = 'HH:mm'): Date => {
    return moment(timeStr, format).toDate();
  },
  convertTimeToString: (timeDate: Date, format: string = 'HH:mm'): string => {
    return moment(timeDate).format(format);
  },
  //Mario
  convertSecondsToStringTime: (seconds: number, format: string = 'HH:mm:ss'): string => {
    if(seconds==null){
        return '';
    }else{
      const hours = seconds / 3600;
      const minutes = (seconds % 3600) / 60;
      const totalSeconds = seconds % 60;
      let date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(seconds);
      return moment(date).format(format);
    }
  }
}
