import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiografiaDetalladaPageRoutingModule } from './biografia-detallada-routing.module';

import { BiografiaDetalladaPage } from './biografia-detallada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiografiaDetalladaPageRoutingModule
  ],
  declarations: [BiografiaDetalladaPage]
})
export class BiografiaDetalladaPageModule {}
