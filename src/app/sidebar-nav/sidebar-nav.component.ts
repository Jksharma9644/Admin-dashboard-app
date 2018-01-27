import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { navigation} from '../dashboard-module/dashboard-nav';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss']
})
export class SidebarNavComponent  {

  public navigation = navigation;

  public isDivider(item) {
    return item.divider ? true : false
  }
  public isTitle(item) {
    return item.title ? true : false
  }

}
