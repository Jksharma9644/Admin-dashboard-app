import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { routing} from './dashboard.routes';
import { AddProductComponent } from './add-product/add-product.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModuleModule} from '../-shared-module/-shared-module.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductsService} from './Services/products/products.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpModule}    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditCardMaskPipe} from './pipes/base64';

// import { HeaderComponent } from './header/header.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { FooterComponent } from './footer/footer.component';
// import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
// import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),  
    SharedModuleModule,  
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [AdminComponent, AddProductComponent, ProductListComponent,CreditCardMaskPipe]
})
export class DashboardModuleModule { }
