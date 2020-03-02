import { Component, OnDestroy, Inject, OnInit, AfterViewInit, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy, Renderer2, ElementRef, ViewChild, AfterContentChecked } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems, NavData } from '../../../../_nav';
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

  periodoCargando: boolean;

  public navItemsFiltrado = [];
  

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public asideMenuToggler = false;
  public mobileAsideMenuToggler = false;
  public fixed = true;

  public nombreUsuario = '';
  public infoApp: any;
  public allChildren: any[] = [];
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
    //obteniendo los recursos de la sesion
    let allRecursos: any = sessionStorage.getItem('recursos');
    if(allRecursos=='none'){
      return; 
    }
    allRecursos = allRecursos.split(',');
    this.navItemsFiltrado = this.getMenuAutorizado(this.setRecursosAutorizados(navItems,allRecursos));
    //obteniendo el nombre del usuario
    this.nombreUsuario = sessionStorage.getItem('username');
  }

  ngAfterViewInit() {
    this.contractSidebarItems();
    this.parametrosGeneralesFacade.buscarTodos().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
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

  getMenuAutorizado(navItems: NavData[]) {
    let menuAutorizado: NavData[] = [];
    for (let it of navItems) {
      let hijos = this.getMenuHijosAutorizados(it);
      if(hijos.length != 0){
        menuAutorizado.push({
          name: it.name,
          icon: it.icon,
          children: hijos
        });
      }
    }
    return menuAutorizado;
  }

  getMenuHijosAutorizados(navItem: NavData){
    let hijosAutorizados: NavData[] = [];
    for (let child of navItem.children) {
      if(child.autorizado){
        hijosAutorizados.push(child);
      }
    }
    return hijosAutorizados;
  }

  setRecursosAutorizados(navItems: NavData[], recursos: any[]) {
    for (let it of navItems) {
      this.getLastChild(it, recursos);
    }
    return navItems;
  }

  getLastChild(navItem: NavData, recursos: any[]) {
    if (!navItem.children || navItem.children.length === 0) {
      recursos.forEach(function(item){
        if(recursos.indexOf(navItem.permissions[0])!=-1){
          navItem.autorizado = true;
        }else{
          navItem.autorizado = false;
        }
      });
    } else {
      for (let child of navItem.children) {
        this.getLastChild(child,recursos);
      }
    }
  }

  redirectParametrosSistema() {
    window.open(`${window.location.pathname}#/mantenimiento/parametroSistema`, '_blank');
  }

  contractSidebarItems() {
    //Mario: Por mientras, hasta encontrar otra forma con Render2 y ElementRef
    let navItems = this.sidebarNav.nativeElement.querySelectorAll('app-sidebar-nav-dropdown');
    for (let i = 0; i < navItems.length; i++) {
      this.renderer.removeClass(navItems[i], 'open');
    }
  }

  initFechaProceso() {

  }

  onActivate(componente: any){
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
