import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:
      [
        {
          path: 'grid',
          children:
            [
              {
                path: '',
                loadChildren: () => import('./grid/grid.module').then( m => m.GridPageModule)
              }
            ]
        },
        {
          path: 'map',
          children:
            [
              {
                path: '',
                loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
              }
            ]
        },
        {
          path: '',
          redirectTo: '/home/grid',
          pathMatch: 'full'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
