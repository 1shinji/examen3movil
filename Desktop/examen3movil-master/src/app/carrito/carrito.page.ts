import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Entrada } from '../models/entrada.model';
import { NavController } from '@ionic/angular'; // Importar NavController para la navegación

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: Entrada[] = [];
  entradaEditada: Entrada | null = null;
  isEditing: boolean = false;
  total: number = 0; // Propiedad para calcular el total

  constructor(private carritoService: CarritoService, private navCtrl: NavController) {}

  async ngOnInit() {
    this.carrito = await this.carritoService.getCarrito();
    this.calcularTotal(); // Calcular el total al iniciar
  }

  editarEntrada(index: number) {
    this.entradaEditada = { ...this.carrito[index] };
    this.isEditing = true;
  }

  guardarCambiosEntrada() {
    if (this.entradaEditada) {
      const index = this.carrito.findIndex(
        (entrada) => entrada.id === this.entradaEditada!.id
      );
      if (index !== -1) {
        this.carritoService.actualizarEntrada(index, this.entradaEditada);
        this.carrito[index] = this.entradaEditada;
        this.calcularTotal(); // Recalcular el total después de guardar
      }
      this.cancelarEdicion();
    }
  }

  cancelarEdicion() {
    this.entradaEditada = null;
    this.isEditing = false;
  }

  async eliminarEntrada(index: number) {
    await this.carritoService.eliminarEntrada(index);
    this.carrito = await this.carritoService.getCarrito();
    this.calcularTotal(); // Recalcular el total después de eliminar
  }

  // Redirigir a la página de pago
  comprarEntradas() {
    if (this.carrito.length > 0) {
      this.navCtrl.navigateForward('/pago', {
        queryParams: {
          total: this.total, // Enviar el total al componente de pago
          carrito: JSON.stringify(this.carrito), // Enviar el carrito como string
        },
      });
    } else {
      console.log('El carrito está vacío.');
    }
  }

  calcularTotal() {
    this.total = this.carrito.reduce(
      (acc, entrada) => acc + entrada.cantidad * entrada.precio,
      0
    );
  }

  async vaciarCarrito() {
    await this.carritoService.vaciarCarrito();
    this.carrito = await this.carritoService.getCarrito(); // Recargar el carrito
    this.calcularTotal(); // Recalcular el total después de vaciar
  }
}