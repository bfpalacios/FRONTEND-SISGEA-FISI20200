import { Component, OnDestroy, Inject, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy, Renderer2, ElementRef, ViewChild, AfterContentChecked } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../../../_nav';
import { AppState } from '../../../store/app.reducers';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Logout } from '../../../store/actions/auth/auth.actions';
import { Router } from '@angular/router';
import { MdFormOpts, FormModalComponent } from '../../modals/form-modal/form-modal.component';
import { SEC_AUTH, TYPES, RESOURCE_ACTIONS } from '../../../utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PermissionsService } from '../../../services';
import { ParametrosGeneralesFacade } from '../../../../mantenimiento/facade/parametros-generales.facade';
//import { GetAllParametroSistema } from '../../../store/actions/mantenimiento/parametro-sistema.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit, AfterViewInit {

  @ViewChild("sidebarNav", { read: ElementRef }) sidebarNav: ElementRef;

  @ViewChild('md') md: FormModalComponent;

  options: MdFormOpts = {
    title: 'Parámetros del Sistema',
    buttons: {
      ok: { text: 'Guardar', disabled: false },
      cancel: { text: 'Cancelar', class: 'btn-secondary' }
    },
    modalClass: 'modal-mantenimientos'
  }

  public navItems = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public asideMenuToggler = false;
  public mobileAsideMenuToggler = false;
  public fixed = true;

  public nombreUsuario = '';
  public infoApp: any;
  //public allChildren: NavData[] = [];
  public childSelected;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public permisoConsultaFechaProceso: boolean = false;
  public fechaProceso: Date;
  public loadingFecha: boolean = false;

  periodo: string = null;

  //public componenteActual: any;

  form:FormGroup;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private permissionsService: PermissionsService,
    private parametrosGeneralesFacade: ParametrosGeneralesFacade,
    private toasterService: ToastrService,
    private renderer: Renderer2,
    @Inject(SEC_AUTH) private auth: boolean,
    @Inject(DOCUMENT) _document?: any
  ) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      'periodo': new FormControl('', [Validators.required ,Validators.minLength(6), Validators.maxLength(6), Validators.required]),
    });
    this.store.select('globalData', 'infoApp').pipe(takeUntil(this.ngUnsubscribe)).subscribe(infoApp => this.infoApp = infoApp);
    this.store.select('auth', 'menuOptions').pipe(takeUntil(this.ngUnsubscribe)).subscribe(menuOptions => {
      this.navItems = this.auth ? menuOptions : navItems;
      //this.allChildren = this.getLastChildren(this.navItems);
    });
    this.store.select('auth', 'user').pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      this.nombreUsuario = user;
    });
    this.initFechaProceso();
  }

  ngAfterViewInit() {
    this.contractSidebarItems();
    this.parametrosGeneralesFacade.buscarTodos().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      console.log(data);
      this.periodo = data[0].periodo;
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }

  onSelect(typeahead) {
    let data = typeahead.item;
    this.router.navigate([data.url]);
  }

/*getLastChildren(navItems: NavData[]) {
    let items: NavData[] = [];
    for (let it of navItems) {
      this.getLastChild(it, items);
    }
    return items;
  }

  getLastChild(navItem: NavData, children: NavData[]) {
    if (!navItem.children || navItem.children.length === 0) {
      children.push(navItem);
      return children;
    } else {
      for (let child of navItem.children) {
        this.getLastChild(child, children);
      }
    }
  }*/

  redirectParametrosSistema() {
    window.open(`${window.location.pathname}#/mantenimiento/parametroSistema`, '_blank');
  }

  contractSidebarItems() {
    //Mario: Por mientras, hasta encontrar otra forma con Render2 y ElementRef
    let navItems = this.sidebarNav.nativeElement.querySelectorAll('app-sidebar-nav-dropdown');
    //let navItems =  document.getElementsByTagName('app-sidebar-nav-dropdown');
    for (let i = 0; i < navItems.length; i++) {
      //navItems[i].classList.remove('open');
      this.renderer.removeClass(navItems[i], 'open');
    }
    //let itemActive = document.getElementsByClassName('active nav-link');
    /*while(itemActive.parentNode.nodeName === "APP-SIDEBAR"){
        if(itemActive.nodeName === "APP-SIDEBAR-NAV-DROPDOWN"){
          itemActive.classList.add('open');
        }
        itemActive = itemActive.parentElement;
    }*/
  }

  initFechaProceso() {
  /*  this.permisoConsultaFechaProceso = this.permissionsService.hasPermission(
      //this.permissionsService.getValidActions(TYPES.PARAMETRO_SISTEMA.resource), RESOURCE_ACTIONS.CONSULTA);
    if (this.permisoConsultaFechaProceso) {
      //this.store.dispatch(new GetAllParametroSistema());
    }
    this.store.select('parametrosSistema').pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => {
      setTimeout(() => {
        //this.loadingFecha = state.loading;
      });
      //this.fechaProceso = state.data && state.data.length > 0 ? state.data[0].fechaProceso : null;
    });*/
  }

  /*
    Mario: implementado solo para obtener el texto de ayuda de la pagina,
           este metodo no es el responsable del cambio de la pagina
  */
  onActivate(componente: any){
    //this.componenteActual = componente;
    //this.store.dispatch(new UpdatePage(this.componenteActual));
  }

  abrirModalParametros(){
    this.md.show({periodo: this.periodo},RESOURCE_ACTIONS.ACTUALIZACION);
  }

  guardarParametros(){
    this.parametrosGeneralesFacade.registrar(this.form.getRawValue()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.toasterService.success('Realizado con exito','Actualización');
      this.parametrosGeneralesFacade.buscarTodos().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        this.periodo = data[0].periodo;
      });
      this.md.hide();
    });
  }

}
