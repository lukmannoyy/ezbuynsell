import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemdisplayPageRoutingModule } from './itemdisplay-routing.module';

import { ItemdisplayPage } from './itemdisplay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemdisplayPageRoutingModule
  ],
  declarations: [ItemdisplayPage]
})
export class ItemdisplayPageModule {}
