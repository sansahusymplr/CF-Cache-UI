import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeSearchComponent } from './components/employee-search/employee-search.component';
import { LoginComponent } from './components/login/login.component';
import { TenantInterceptor } from './interceptors/tenant.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeSearchComponent,
    LoginComponent
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
