import { Routes, RouterModule } from '@angular/router';
import { AdminComponent} from './admin/admin.component';

const routes: Routes = [
    { path: '', component: AdminComponent },
  ];
  
  export const routing = RouterModule.forChild(routes);
