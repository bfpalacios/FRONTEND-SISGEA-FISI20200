import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { extractSimpleArrayFromObjArray } from '../../utils';
import { filter } from 'rxjs/operators';
import { SetCurrentTitleAction } from '../../store/actions/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event) => {
        let breadcrumbs = [];
        let currentRoute = this.route.root;
        let url = '';
        let title;
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach(route => {
            if (route.outlet === 'primary') {
              const routeSnapshot = route.snapshot;
              url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
              breadcrumbs.push({
                label: route.snapshot.data.title,
                url: url
              });
              currentRoute = route;
            }
          });
        } while (currentRoute);
        breadcrumbs = breadcrumbs.filter(b => b.url.slice(-1) == '/');
        breadcrumbs.splice(0, 1);
        if (breadcrumbs.length > 0) {
          title = ' | ' + extractSimpleArrayFromObjArray(breadcrumbs, 'label').join(' - ');
        } else {
          title = ' | Inicio';
        }
        this.store.dispatch(new SetCurrentTitleAction(title));
      });
  }

}