import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';  // Asegúrate de tener el modal importado

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ''; // Correo del usuario
  password: string = ''; // Contraseña

  constructor(
    private afAuth: AngularFireAuth, // Servicio de autenticación
    private navCtrl: NavController,   // Controlador de navegación
    private toastController: ToastController, // Controlador de toasts (mensajes)
    private modalCtrl: ModalController  // Controlador de modales
  ) {}

  ngOnInit() {}

  // Función de login
  async login() {
    try {
      // Intentar iniciar sesión con email y contraseña
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.username, this.password);
      this.showToast('Login exitoso');
      this.navCtrl.navigateRoot('/home');  // Redirige al home después de login exitoso
    } catch (error: any) {
      // Verifica si el error tiene un código específico
      console.error(error); // Muestra el error completo para depuración

      if (error?.code === 'auth/user-not-found') {
        this.showToast('Usuario no encontrado.');
      } else if (error?.code === 'auth/wrong-password') {
        this.showToast('Contraseña incorrecta.');
      } else {
        // Si el error no es específico, muestra un mensaje genérico
        this.showToast(error?.message || 'Error en el login, por favor intenta de nuevo.');
      }
    }
  }

  // Función para mostrar un mensaje de toast (notificación)
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,  // Duración del toast
      color: 'danger'  // Color del mensaje (puede ser 'success', 'danger', etc.)
    });
    await toast.present();
  }

  // Función para abrir el modal de "Olvidar Contraseña"
  async openForgotPasswordModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent // Modal para recuperar la contraseña
    });
    return await modal.present();
  }
}