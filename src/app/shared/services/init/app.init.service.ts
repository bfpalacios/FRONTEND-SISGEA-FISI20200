import { Injectable } from '@angular/core';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class AppInitService {
  constructor() { }
  init() {
    return new Promise((resolve, reject) => {
      fetch('assets/config/app-config.json')
        .then((response) => {
          return response.json();
        })
        .catch(err => {
          console.error(err);
          reject(false);
        })
        .then((data) => {
          window.config = data;
          resolve(true);
        });
    });
  }
}
