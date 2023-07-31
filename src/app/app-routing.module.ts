import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: '/auth',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		component: AuthComponent,
		// data: { animation: 'AUTH' }
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'home',
      //   pathMatch: 'full'
      // },
      {
				path: 'home',
				loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
				// canActivate: [AuthGuard]
			},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
