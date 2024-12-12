import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebasSqlitePage } from './pruebas-sqlite.page';

const routes: Routes = [
  {
    path: '',
    component: PruebasSqlitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebasSqlitePageRoutingModule {}
