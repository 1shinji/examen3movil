import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  // Para la navegación

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileData: any = {
    name: '',
    email: '',
    phone: ''
  };
  editing: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router  // Inyectamos el Router para la redirección
  ) {}

  ngOnInit() {
    // Cargamos los datos del perfil al iniciar la página
    this.auth.user.subscribe(user => {
      if (user) {
        this.firestore.collection('profiles').doc(user.uid).valueChanges().subscribe(data => {
          if (data) {
            this.profileData = data;  // Cargamos los datos existentes del perfil
          }
        });
      }
    });
  }

  // Activar modo de edición
  editProfile() {
    this.editing = true;
  }

  // Guardar los cambios en Firestore
  saveProfile() {
    this.auth.currentUser.then(user => {
      if (user) {
        this.firestore.collection('profiles').doc(user.uid).set(this.profileData)
          .then(() => {
            this.editing = false;
            this.showToast('Perfil actualizado correctamente', 'success');
          })
          .catch(error => {
            console.error("Error al guardar el perfil: ", error);
            this.showToast('Error al actualizar el perfil', 'danger');
          });
      }
    });
  }

  // Cancelar la edición y volver a los datos anteriores
  cancelEdit() {
    this.editing = false;
    this.ngOnInit(); // Recargamos los datos originales del perfil
  }

  // Método para mostrar mensajes
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }

  // Método para hacer logout
  async logout() {
    try {
      await this.auth.signOut();  // Cierra la sesión del usuario
      this.router.navigate(['/login']);  // Redirige al login
      this.showToast('Sesión cerrada con éxito', 'success');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      this.showToast('Error al cerrar sesión', 'danger');
    }
  }
}