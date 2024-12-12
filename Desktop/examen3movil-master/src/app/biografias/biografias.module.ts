import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiografiasPageRoutingModule } from './biografias-routing.module';

import { BiografiasPage } from './biografias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiografiasPageRoutingModule
  ],
  declarations: [BiografiasPage]
})
export class BiografiasPageModule {}
