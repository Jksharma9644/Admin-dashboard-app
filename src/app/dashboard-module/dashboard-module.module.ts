import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { routing} from './dashboard.routes';
import { AddProductComponent } from './add-product/add-product.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProductListComponent } from './product-list/product-list.component';


// import { HeaderComponent } from './header/header.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { FooterComponent } from './footer/footer.component';
// import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
// import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),    
    routing
  ],
  declarations: [AdminComponent, AddProductComponent, ProductListComponent]
})
export class DashboardModuleModule { }
