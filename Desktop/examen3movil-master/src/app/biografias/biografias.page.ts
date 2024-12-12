import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-biografias',
  templateUrl: './biografias.page.html',
  styleUrls: ['./biografias.page.scss'],
})
export class BiografiasPage implements OnInit {
  artistas = [
    {
      nombre: 'Jeff Buckley',
      descripcion: 'Cantante y compositor de "Grace".',
      imagen: 'assets/icon/jeffbuckley.png',
      biografia: 'Jeff Buckley fue un cantante y compositor estadounidense conocido por su álbum "Grace", una obra maestra del rock alternativo. Su emotiva voz y su interpretación han dejado un legado imborrable en la música contemporánea.'
    },
    {
      nombre: 'Radiohead',
      descripcion: 'Banda británica de rock alternativo.',
      imagen: 'assets/icon/radiohead.png',
      biografia: 'Radiohead es una banda británica conocida por su estilo innovador y su evolución musical a lo largo de los años. Entre sus álbumes más icónicos se encuentran "OK Computer" y "Kid A".'
    },
    {
      nombre: 'Gustavo Cerati',
      descripcion: 'Líder de Soda Stereo.',
      imagen: 'assets/icon/gustavocerati.png',
      biografia: 'Gustavo Cerati fue un músico argentino y una de las figuras más influyentes del rock en español. Como líder de Soda Stereo, marcó una era con éxitos como "De Música Ligera".'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  // Navegar a la página de biografía detallada
  verBiografia(artista: any) {
    this.router.navigate(['/biografia-detallada'], { state: { artista } });
  }
}