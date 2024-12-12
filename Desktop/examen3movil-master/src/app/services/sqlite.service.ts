import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {}

  // Inicializa la base de datos y crea las tablas necesarias
  async initializeDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'mydatabase.db',
        location: 'default'
      });

      // Crear tablas iniciales
      await this.createUsersTable();
      await this.createCartTable();

      console.log('Database initialized');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  // Crear tabla de usuarios
  private async createUsersTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
      )
    `;
    return this.dbInstance?.executeSql(query, []);
  }

  // Crear tabla de carrito
  private async createCartTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productId INTEGER,
        quantity INTEGER
      )
    `;
    return this.dbInstance?.executeSql(query, []);
  }

  // Método para agregar un usuario
  async addUser(email: string, password: string) {
    if (!this.dbInstance) {
      throw new Error('Database is not initialized');
    }
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    try {
      return await this.dbInstance.executeSql(query, [email, password]);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }

  // Método para obtener un usuario
  async getUser(email: string, password: string) {
    if (!this.dbInstance) {
      throw new Error('Database is not initialized');
    }
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    try {
      const result = await this.dbInstance.executeSql(query, [email, password]);
      return result.rows.length > 0 ? result.rows.item(0) : null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Método para agregar un producto al carrito
  async addToCart(productId: number, quantity: number) {
    if (!this.dbInstance) {
      throw new Error('Database is not initialized');
    }
    const query = 'INSERT INTO cart (productId, quantity) VALUES (?, ?)';
    try {
      return await this.dbInstance.executeSql(query, [productId, quantity]);
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  // Método para obtener todos los productos en el carrito
  async getCartItems() {
    if (!this.dbInstance) {
      throw new Error('Database is not initialized');
    }
    const query = 'SELECT * FROM cart';
    try {
      const result = await this.dbInstance.executeSql(query, []);
      const items = [];
      for (let i = 0; i < result.rows.length; i++) {
        items.push(result.rows.item(i));
      }
      return items;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  }

  // Método para eliminar un producto del carrito
  async removeFromCart(productId: number) {
    if (!this.dbInstance) {
      throw new Error('Database is not initialized');
    }
    const query = 'DELETE FROM cart WHERE productId = ?';
    try {
      return await this.dbInstance.executeSql(query, [productId]);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  }

  // Método para vaciar el carrito de compras
  async clearCart() {
    if (!this.dbInstance) {
      throw new Error('Database is not initialized');
    }
    const query = 'DELETE FROM cart';
    try {
      return await this.dbInstance.executeSql(query, []);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
}