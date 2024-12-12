import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  nombreTitular = '';
  numeroTarjeta = '';
  mesExpiracion = '';
  anioExpiracion = '';
  cvv = '';
  total: number = 0;

  meses: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  anios: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['total']) {
        this.total = +params['total'];
      }
    });

    // Generar años desde el actual hasta 10 años adelante
    const anioActual = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.anios.push((anioActual + i).toString().slice(2)); // Solo los últimos dos dígitos
    }
  }

  validarNumeroTarjeta() {
    // Eliminar espacios o caracteres no numéricos
    this.numeroTarjeta = this.numeroTarjeta.replace(/\D/g, '');

    // Validar longitud
    if (this.numeroTarjeta.length > 16) {
      this.numeroTarjeta = this.numeroTarjeta.slice(0, 16); // Limitar a 16 dígitos
    }
  }

  async procesarPago() {
    // Validación del Número de Tarjeta
    if (!/^\d{16}$/.test(this.numeroTarjeta)) {
      this.mostrarToast('El número de tarjeta debe tener exactamente 16 dígitos.', 'danger');
      return;
    }

    // Validación de Fecha de Expiración
    if (!this.mesExpiracion || !this.anioExpiracion) {
      this.mostrarToast('Selecciona una fecha de expiración válida.', 'danger');
      return;
    }

    // Validación del CVV
    if (!/^\d{3}$/.test(this.cvv)) {
      this.mostrarToast('El CVV debe tener exactamente 3 dígitos.', 'danger');
      return;
    }

    // Validación del Nombre del Titular
    if (!this.nombreTitular.trim()) {
      this.mostrarToast('El nombre del titular es obligatorio.', 'danger');
      return;
    }

    // Simulación del procesamiento del pago
    this.mostrarToast('Pago realizado con éxito.', 'success');

    // Redirigir a la página principal o de confirmación
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000); // Breve retraso para mostrar el mensaje de éxito
  }

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    await toast.present();
  }
}