import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { KEY_TOKEN } from '../../utils';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private jwtHelper: JwtHelperService,
    private storageService: StorageService
  ) {}

  isTokenValid(): boolean {
    if(this.storageService.checkItem(KEY_TOKEN) && !this.jwtHelper.isTokenExpired()){
      return true;
    }
    return false;
  }

}