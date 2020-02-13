import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TitleService } from './shared';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from './shared/store/app.reducers';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: TitleService,
    private store: Store<AppState>,
    private title: Title) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this.store.select('ui').subscribe((uiState) => this.title.setTitle(uiState.currentTitle));
  }
}
