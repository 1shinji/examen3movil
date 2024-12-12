import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private afMessaging: AngularFireMessaging,
    private toastController: ToastController
  ) {
    this.requestPermission();
    this.listenToMessages();
  }

  // Solicitar permiso para notificaciones y manejar el token
  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        if (token) {
          console.log('Notification token received:', token);
          localStorage.setItem('fcm_token', token); // Guardar token si no es null
        } else {
          console.error('No notification token received');
        }
      },
      (error) => {
        console.error('Error while requesting notification permission:', error);
      }
    );
  }

  // Escuchar notificaciones entrantes y mostrar Toast
  async listenToMessages() {
    this.afMessaging.messages.subscribe(
      async (message: any) => {
        console.log('Mensaje recibido:', message);
        const toast = await this.toastController.create({
          message: message.notification?.title || 'Nueva notificación',
          duration: 3000,
          position: 'top',
        });
        toast.present();
      },
      (error) => {
        console.error('Error while listening to notifications:', error);
      }
    );
  }
}