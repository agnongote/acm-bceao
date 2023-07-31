import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CryptoInterceptorService } from './shared/services/crypto-intercepteur.service';
import { AuthComponent } from './auth/auth.component';
import { LayoutModule } from './layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LayoutModule,
    HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
    SharedModule
  ],
  providers: [
		{
		  provide: HTTP_INTERCEPTORS,
		  useClass: CryptoInterceptorService,
		  multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
