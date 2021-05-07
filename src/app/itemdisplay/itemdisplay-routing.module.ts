import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemdisplayPage } from './itemdisplay.page';

const routes: Routes = [
  {
    path: '',
    component: ItemdisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemdisplayPageRoutingModule {}
