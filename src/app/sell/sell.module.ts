import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { SellPageRoutingModule } from './sell-routing.module';

import { SellPage } from './sell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SellPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SellPage]
})
export class SellPageModule {}
