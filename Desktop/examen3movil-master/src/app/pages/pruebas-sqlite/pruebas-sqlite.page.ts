import { Component } from '@angular/core';
import { SqliteService } from '../../services/sqlite.service';

@Component({
  selector: 'app-pruebas-sqlite',
  templateUrl: './pruebas-sqlite.page.html',
  styleUrls: ['./pruebas-sqlite.page.scss'],
})
export class PruebasSqlitePage {
  constructor(private sqliteService: SqliteService) {}

  async agregarUsuarioPrueba() {
    try {
      await this.sqliteService.addUser('test@example.com', 'password123');
      console.log('Usuario agregado correctamente');
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  }

  async consultarUsuarios() {
    try {
      const usuarios = await this.sqliteService.getCartItems();
      console.log('Usuarios:', usuarios);
    } catch (error) {
      console.error('Error al consultar usuarios:', error);
    }
  }

  async agregarProductoCarrito() {
    try {
      await this.sqliteService.addToCart(1, 3); // Producto con ID 1 y cantidad 3
      console.log('Producto agregado al carrito');
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  }

  async consultarCarrito() {
    try {
      const carrito = await this.sqliteService.getCartItems();
      console.log('Carrito:', carrito);
    } catch (error) {
      console.error('Error al consultar el carrito:', error);
    }
  }

  async vaciarCarrito() {
    try {
      await this.sqliteService.clearCart();
      console.log('Carrito vaciado correctamente');
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
    }
  }
}