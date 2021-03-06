import { Routes, RouterModule } from '@angular/router';
import { AdminComponent} from './admin/admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';


const routes: Routes = [
    { path: '', component: AdminComponent },
    { path: 'Product/Create', component: AddProductComponent },
    { path: 'Product/List', component: ProductListComponent },
    { path: 'Product/edit/:id', component: EditProductComponent },
    { path: 'Orders/List', component: OrdersListComponent },
    { path: 'Orders/Details', component: OrderDetailsComponent },
    { path: 'Product/Categories/Add', component: ProductCategoryComponent },
    { path: 'Product/Categories/List', component: CategoryListComponent },
    { path: 'Product/Categories/edit/:id', component: EditCategoryComponent },
  ];
  
  export const routing = RouterModule.forChild(routes);
