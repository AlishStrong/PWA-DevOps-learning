import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class MenuRoutingModule { }
