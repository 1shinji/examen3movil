import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebasSqlitePageRoutingModule } from './pruebas-sqlite-routing.module';

import { PruebasSqlitePage } from './pruebas-sqlite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebasSqlitePageRoutingModule
  ],
  declarations: [PruebasSqlitePage]
})
export class PruebasSqlitePageModule {}
