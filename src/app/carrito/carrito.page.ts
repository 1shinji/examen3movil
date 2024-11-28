import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Entrada } from '../models/entrada.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: Entrada[] = [];
  entradaEditada: Entrada | null = null; // Propiedad para editar una entrada
  isEditing: boolean = false; // Indicador para saber si se está editando

  constructor(private carritoService: CarritoService) {}

  async ngOnInit() {
    this.carrito = await this.carritoService.getCarrito(); // Cargar el carrito al iniciar
  }

  // Método para iniciar la edición de una entrada
  editarEntrada(index: number) {
    this.entradaEditada = { ...this.carrito[index] }; // Clonar la entrada para edición
    this.isEditing = true;
  }

  // Método para guardar los cambios en la entrada editada
  guardarCambiosEntrada() {
    if (this.entradaEditada) {
      const index = this.carrito.findIndex(entrada => entrada.id === this.entradaEditada!.id);
      if (index !== -1) {
        this.carritoService.actualizarEntrada(index, this.entradaEditada);
        this.carrito[index] = this.entradaEditada;
      }
      this.cancelarEdicion(); // Limpiar y finalizar la edición
    }
  }

  // Método para cancelar la edición
  cancelarEdicion() {
    this.entradaEditada = null;
    this.isEditing = false;
  }

  // Método para eliminar una entrada del carrito
  async eliminarEntrada(index: number) {
    await this.carritoService.eliminarEntrada(index);
    this.carrito = await this.carritoService.getCarrito(); // Recargar el carrito después de la eliminación
  }

  // Método para simular la compra de entradas
  comprarEntradas() {
    if (this.carrito.length > 0) {
      console.log('Compra realizada con éxito:', this.carrito);
      this.carritoService.vaciarCarrito();
      this.carrito = [];
    } else {
      console.log('El carrito está vacío.');
    }
  }
}