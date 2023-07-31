import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
// import { HeaderComponent } from './header/header.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
// import { ChangePasswordComponent } from './header/change-password/change-password.component';
// import { AttachAccountComponent } from './header/attach-account/attach-account.component';
// import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
	declarations: [
		// HeaderComponent,
		FooterComponent, MainLayoutComponent,
		// ChangePasswordComponent, AttachAccountComponent,
		SidebarComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		// TranslateModule
	],
	exports: [
		// HeaderComponent,
		SidebarComponent,
		FooterComponent, MainLayoutComponent]
})
export class LayoutModule {}
