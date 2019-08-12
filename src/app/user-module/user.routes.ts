import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'Signup', component: RegisterComponent },
  ];
  
  export const routing = RouterModule.forChild(routes);
