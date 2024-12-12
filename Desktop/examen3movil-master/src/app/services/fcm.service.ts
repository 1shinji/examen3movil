import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(private afMessaging: AngularFireMessaging) {}

  // Solicitar permisos para notificaciones
  requestPermission() {
    this.afMessaging.requestToken.pipe(take(1)).subscribe(
      (token) => {
        if (token) {
          console.log('Notification permission granted and token received:', token);
          localStorage.setItem('fcm_token', token); // Guardar el token en el localStorage
        } else {
          console.warn('No token received. Notification permission might not have been granted.');
        }
      },
      (error) => {
        console.error('Error while requesting permission for notifications:', error);
      }
    );
  }

  // Escuchar notificaciones entrantes
  listenToNotifications() {
    this.afMessaging.messages.pipe(take(1)).subscribe(
      (message) => {
        console.log('New notification received:', message);
      },
      (error) => {
        console.error('Error while receiving notification:', error);
      }
    );
  }
}