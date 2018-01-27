import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { AuthGuard} from './_guard/auth.guard';
export const routes: Routes = [
    {
        path: '', 
        loadChildren:'app/user-module/user-module.module#UserModuleModule'
    },
    {
        path: 'Dashboard', 
        loadChildren:'app/dashboard-module/dashboard-module.module#DashboardModuleModule'
    },  
    { path: '**', redirectTo: '' }


]


export const routing = RouterModule.forRoot(routes);