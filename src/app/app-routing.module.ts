import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importa el guard para proteger rutas

const routes: Routes = [
  // Ruta inicial que redirige al registro
  {
    path: '',
    redirectTo: 'registro',  // Primero muestra la página de registro
    pathMatch: 'full'
  },
  // Página de registro
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  // Página de login
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  // Página de home, protegida por el AuthGuard
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]  // Protege esta ruta para usuarios logueados
  },
  // Ruta de compra de entradas, también protegida
  {
    path: 'compra-entradas',
    loadChildren: () => import('./compra-entradas/compra-entradas.module').then(m => m.CompraEntradasPageModule),
    canActivate: [AuthGuard]  // Protege esta ruta
  },
  // Otras rutas públicas o protegidas
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoPageModule),
    canActivate: [AuthGuard]  // Protege esta ruta
  },
  {
    path: 'confirmacion-pago',
    loadChildren: () => import('./confirmacion-pago/confirmacion-pago.module').then(m => m.ConfirmacionPagoPageModule),
    canActivate: [AuthGuard]  // Protege esta ruta
  },
  {
    path: 'eventos',
    loadChildren: () => import('./eventos/eventos.module').then(m => m.EventosModule)  // Página de eventos (sin protección de guardia)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]  // Protege esta ruta
  },
  // Otros componentes y páginas
  {
    path: 'geolocalizacion',
    loadChildren: () => import('./geolocalizacion/geolocalizacion.module').then(m => m.GeolocalizacionPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then(m => m.CamaraPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}