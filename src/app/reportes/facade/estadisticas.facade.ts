import { Injectable } from '@angular/core';
import { AppState } from '../../shared/store/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EstadisticasService } from '../services';

@Injectable()
export class EstadisticasFacade {

  constructor(
    private store: Store<AppState>,
    private service: EstadisticasService,
  ){}

  
}
