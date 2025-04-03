import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', active: true }
  ];

  roles = ['Admin', 'User', 'Manager'];
  newUser: User = { name: '', email: '', role: 'User', active: true };
  selectedUser: User | null = null;
  searchText = '';

  addUser() {
    if (this.newUser.name && this.newUser.email) {
      this.newUser.id = this.users.length + 1;
      this.users.push({...this.newUser});
      this.newUser = { name: '', email: '', role: 'User', active: true };
    }
  }

  editUser(user: User) {
    this.selectedUser = {...user};
  }

  updateUser() {
    if (this.selectedUser) {
      const index = this.users.findIndex(u => u.id === this.selectedUser?.id);
      if (index !== -1) {
        this.users[index] = {...this.selectedUser};
        this.selectedUser = null;
      }
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  get filteredUsers() {
    return this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}