import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biografia-detallada',
  templateUrl: './biografia-detallada.page.html',
  styleUrls: ['./biografia-detallada.page.scss'],
})
export class BiografiaDetalladaPage implements OnInit {
  artista: {
    nombre: string;
    descripcion: string;
    imagen: string;
    biografia: string;
    logros: string[];
  } | null = null;
  mostrarBiografia: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['artista']) {
      this.artista = navigation.extras.state['artista'] as {
        nombre: string;
        descripcion: string;
        imagen: string;
        biografia: string;
        logros: string[];
      };
    }
  }

  ngOnInit() {}

  toggleBiografia() {
    this.mostrarBiografia = !this.mostrarBiografia;
  }

  escucharMusica() {
    if (this.artista?.nombre) {
      const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(this.artista.nombre)}`;
      window.open(spotifyUrl, '_blank');
    }
  }
}