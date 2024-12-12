import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importa AngularFireAuth para verificar si el usuario está logueado

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string | null = '';   // Nombre de usuario
  latitude: number | undefined;   // Latitud
  longitude: number | undefined;  // Longitud
  capturedImage: string | null = null;  // Variable para almacenar la imagen capturada
  user: any = null; // Para almacenar la información del usuario autenticado

  constructor(
    private geolocation: Geolocation,
    private camera: Camera,
    private router: Router,
    private afAuth: AngularFireAuth  // Servicio de autenticación
  ) {}

  ngOnInit() {
    this.loadUsername();
    this.getCurrentLocation();
    this.checkAuthStatus(); // Verifica si el usuario está autenticado
  }

  // Cargar el nombre de usuario desde localStorage
  loadUsername() {
    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername ? storedUsername : 'Invitado';
  }

  // Verificar si el usuario está logueado
  checkAuthStatus() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user; // Si el usuario está logueado, almacena la info
        this.username = user.email; // Aquí puedes usar su correo o el nombre del usuario
      } else {
        this.user = null;
        this.username = 'Invitado'; // Si no está logueado, muestra "Invitado"
      }
    });
  }

  // Obtener la ubicación actual
  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.error('Error getting location', error);
    });
  }

  // Función para capturar una imagen con la cámara
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // La imagen capturada se guarda en base64
      this.capturedImage = 'data:image/jpeg;base64,' + imageData;
    }).catch((error) => {
      console.error('Error capturing image', error);
    });
  }

  // Navegar a la página de eventos
  navigateToEventos() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        username: this.username,
        latitude: this.latitude,
        longitude: this.longitude
      }
    };

    this.router.navigate(['/eventos'], navigationExtras);
  }
}
