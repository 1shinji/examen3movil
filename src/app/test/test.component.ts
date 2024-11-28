import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']  // Cambiado a .scss
})
export class TestComponent implements OnInit {
  userData: any;

  constructor(private sqliteService: SqliteService) {}

  async ngOnInit() {
    try {
      await this.sqliteService.initializeDatabase();
      console.log('Database initialized');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async addUser() {
    console.log('Add User button clicked');  // Log para verificar si se llama a la función
    try {
      await this.sqliteService.addUser('test@example.com', 'password123');
      console.log('User added');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
  
  async getUser() {
    console.log('Get User button clicked');  // Log para verificar si se llama a la función
    try {
      const user = await this.sqliteService.getUser('test@example.com', 'password123');
      this.userData = user ? user : 'User not found';
      console.log(this.userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }
}