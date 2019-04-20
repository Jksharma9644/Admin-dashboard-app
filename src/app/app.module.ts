import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing} from './app.routing';
import { HttpModule } from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

// import { UserModuleModule} from './user-module/user-module.module';
import {SharedModuleModule} from'./-shared-module/-shared-module.module';
import { AppComponent } from './app.component';
import { CommonModule} from'@angular/common';
import { BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent} from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { SidebarComponent} from './sidebar/sidebar.component';
import { SidebarNavComponent} from './sidebar-nav/sidebar-nav.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

//firebase

//firebase Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment} from '../environments/environment';
import {firebaseConfig} from '../environments/firebase.config';
import { AppBannerScreenComponent } from './app-banner-screen/app-banner-screen.component';
import { DropzoneDirective } from './directives/dropzone.directive';
// import { UploaderComponent } from './shared-module/uploader/uploader.component';
// import { UploadTaskComponent } from './shared-module/upload-task/upload-task.component';


@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SidebarNavComponent,
    AppBannerScreenComponent,
    DropzoneDirective
    
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    routing,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    SharedModuleModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    HttpClientModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
