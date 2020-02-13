import { Component, OnInit, AfterViewInit, Input, ViewChild, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Type, RESOURCE_ACTIONS, HelpText } from '../../utils';
import { ModalComponent } from '../modals/modal/modal.component';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../shared/store/app.reducers';

@Component({
  selector: 'app-ob-modal-help',
  templateUrl: './ob-modal-help.component.html',
  styleUrls: ['./ob-modal-help.component.scss']
})
export class ObModalHelpComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() componente: any;
  type: Type = null;
  helpText: HelpText = null;
  title: string = "Ayuda";
  classModal: string = "modal-md";

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @ViewChild('md') md: ModalComponent;

  constructor(
    private cdRef : ChangeDetectorRef,
    private store: Store<AppState>,
  ) {
    this.manageState();
  }

  ngOnInit() {
  }

  manageState() {
    this.store.select('help').pipe(takeUntil(this.ngUnsubscribe)).subscribe((state) => {
      this.setComponente(state.component);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngAfterViewInit() {
    this.setComponente(this.componente);
  }

  clickVerAyuda(){
    this.md.show();
  }

  setComponente(componente: any){
    if(componente && componente.type){
      this.componente = componente;
      this.type = componente.type != undefined ? componente.type : null;
      this.helpText = componente.type.helpText != undefined ? componente.type.helpText : null;
      this.cdRef.detectChanges();
    }
  }

}
