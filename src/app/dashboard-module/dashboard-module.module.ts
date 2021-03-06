import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { routing} from './dashboard.routes';
import { AddProductComponent } from './add-product/add-product.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModuleModule} from '../-shared-module/-shared-module.module';
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated"
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsService} from './Services/products/products.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpModule}    from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditCardMaskPipe} from './pipes/base64';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgxEditorModule } from 'ngx-editor';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { UploadFormComponent } from './fileupload/upload-form/upload-form.component';
// import { DropzoneDirective } from '../directives/dropzone.directive';

// import { HeaderComponent } from './header/header.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { FooterComponent } from './footer/footer.component';
// import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
// import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';


@NgModule({
  imports: [
    CommonModule,
    NgxEditorModule,
    AngularFireDatabaseModule,
    TabsModule.forRoot(),  
    SharedModuleModule.forRoot(),
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
    declarations: [AdminComponent, AddProductComponent, ProductListComponent,CreditCardMaskPipe, EditProductComponent, OrdersListComponent, OrderDetailsComponent, ProductCategoryComponent, CategoryListComponent, EditCategoryComponent, UploadFormComponent]
 
})
export class DashboardModuleModule { }
