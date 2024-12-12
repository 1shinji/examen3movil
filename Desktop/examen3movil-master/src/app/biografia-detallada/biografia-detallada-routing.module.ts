import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiografiaDetalladaPage } from './biografia-detallada.page';

const routes: Routes = [
  {
    path: '',
    component: BiografiaDetalladaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiografiaDetalladaPageRoutingModule {}
