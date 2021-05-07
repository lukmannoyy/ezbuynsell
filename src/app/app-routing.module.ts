// app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';






const routes: Routes = [

  {
    path: '',
    redirectTo: 'startup',
    pathMatch: 'full'
  },
  {
    path: 'startup',
     loadChildren: () => import('./startup/startup.module').then( m => m.StartupPageModule),

   },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),

  },
  {
    path: 'sell',
    loadChildren: () => import('./sell/sell.module').then( m => m.SellPageModule)
  },
  {
    path: 'favourite',
    loadChildren: () => import('./favourite/favourite.module').then( m => m.FavouritePageModule)
  },
  {
    path: 'itemdisplay',
    loadChildren: () => import('./itemdisplay/itemdisplay.module').then( m => m.ItemdisplayPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item.module').then( m => m.ItemPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
