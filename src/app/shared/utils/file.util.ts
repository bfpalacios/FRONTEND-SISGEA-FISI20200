import * as fileSave from 'file-saver';

export const FILE_EXT = {
  XLSX: '.xlsx'
}

export function downLoadFile(data: any, type: string, fileName: string) {
  let blob = new Blob([data], { type: type });
  fileSave.saveAs(blob, fileName);
}