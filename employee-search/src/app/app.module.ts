import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { LoginComponent } from './components/login/login.component';
import { ImageManagementComponent } from './components/image-management/image-management.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TenantInterceptor } from './interceptors/tenant.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeSearchComponent,
    LoginComponent,
    ImageManagementComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
