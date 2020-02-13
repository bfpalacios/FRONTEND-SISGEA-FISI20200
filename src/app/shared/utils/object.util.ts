export function objectIsEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function isComboSelected(obj: any) : boolean{
    if(obj === null){
      return false;
    }
    if(obj === undefined){
      return false;
    }
    return true;
}

export function setBooleansFalseInObjet(obj: any): any{
  for(var key in obj) {
      let dateType = typeof obj[key];
      console.log(dateType,key);
      if(dateType==='boolean' && obj[key]==null){
        obj[key] = false;
      }
  }
  return obj;
}
