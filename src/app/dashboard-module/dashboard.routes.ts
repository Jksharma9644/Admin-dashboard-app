import { Routes, RouterModule } from '@angular/router';
import { AdminComponent} from './admin/admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
    { path: '', component: AdminComponent },
    { path: 'Product/Create', component: AddProductComponent },
    { path: 'Product/List', component: ProductListComponent },
  ];
  
  export const routing = RouterModule.forChild(routes);
