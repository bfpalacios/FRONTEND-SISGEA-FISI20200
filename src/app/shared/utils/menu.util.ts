import { NavData } from '../../_nav';

/**
 * Forma el arbol proveniente del servidor, colocando las key que corresponden
 * @param options Arboles 
 */
export function getMenuSidebar(options: any[]) {
  let menu: NavData[] = [];
  for (let option of options) {
    let tmpNav: NavData = {
      id: option.idMenu, 
      icon: option.icono,
      name: option.descripcionMenu,
      children: []
    }
    if(option.url) tmpNav.url = option.url;
    iterateSubMenu(option, tmpNav);
    menu.push(JSON.parse(JSON.stringify(tmpNav)));
  }
  return menu;
}

/**
 * Recorre un submenu obtenido del server 
 * @param option Arbol de entrada del server
 * @param nav Arbol de salida que se utilizará para pintar el sidebar
 */
export function iterateSubMenu(option: any, nav: NavData) {
  if(!option.subMenusArboles || option.subMenusArboles.length === 0){
    delete nav['children'];
  } else {
    for (let subMenu of option.subMenusArboles) {
      let tmpNav: NavData = {
        id: subMenu.idMenu,
        icon: subMenu.icono,
        name: subMenu.descripcionMenu,
        children: []
      }
      if(subMenu.url) tmpNav.url = subMenu.url;
      nav.children.push(tmpNav);
      iterateSubMenu(subMenu, tmpNav);
    }
  }
}