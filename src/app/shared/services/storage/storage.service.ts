import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(key: string, value: string){
    localStorage.setItem(key, value);
  }

  getItem(key: string){
    return localStorage.getItem(key);
  }

  removeItem(key: string){
    localStorage.removeItem(key);
  }

  clear(){
    localStorage.clear();
  }

  checkItem(key: string): boolean {
    let value = localStorage.getItem(key); 
    return value !== null && value !== undefined && value !== '';
  }

}