import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  
import { TestComponent } from './test/test.component';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx'; // Importar Geolocation
import { Camera } from '@awesome-cordova-plugins/camera/ngx'; // Importar Camera

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './modal/modal.component';

// Firebase imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

// Stripe imports
import { NgxStripeModule } from 'ngx-stripe';

// Ionic Storage import
import { IonicStorageModule } from '@ionic/storage-angular';

// Servicios
import { EntradasService } from './compra-entradas/entradas.service';
import { EventosService } from './services/eventos.service';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxStripeModule.forRoot('sk_test_51Q9vZWRvQIl6GZuTVdIqYnAvUmVoqD3zefL8zF5slTexosAchesafCeeGP2alUe4XPehAecdADjM4sK1LFKirHYv00J8lnd1Wy'),
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EntradasService,
    EventosService,
    SQLite,
    Geolocation, // Agregar Geolocation
    Camera      // Agregar Camera
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}