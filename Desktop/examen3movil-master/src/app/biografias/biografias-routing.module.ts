import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiografiasPage } from './biografias.page';

const routes: Routes = [
  {
    path: '',
    component: BiografiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiografiasPageRoutingModule {}
