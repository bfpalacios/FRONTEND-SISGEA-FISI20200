export const DEFAULT_SEPARATOR = ' - ';

export function joinWords(separator:string = DEFAULT_SEPARATOR, ...words: Array<string | number>){
  return words.join(separator);
}

export function upperFirstWord(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function substrWord(word: string,init: number,len: number): string{
  if(word === undefined || word === '' || word === null){
    return '';
  }
  return word.substring(init,len);
}

export function lpad(value: string, len: number): string{
  return (value.length < len) ? lpad("0" + value, len): value
}
