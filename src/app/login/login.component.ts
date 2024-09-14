import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router , private authService: AuthService) {}

  handleLogin(event: Event): void {
    event.preventDefault();
  
    fetch('http://localhost:8084/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.username, password: this.password }),
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // On attend maintenant un JSON contenant userId et role
        } else {
          return response.json().then(result => {
            throw new Error(result.message || 'Login failed');
          });
        }
      })
      .then(data => {
        const { userId, role } = data; // Récupère userId et rôle depuis le backend
        this.authService.login(userId, role); // Passe userId et rôle au AuthService
        this.router.navigate(['/documents']);
      })
      .catch(error => {
        this.error = 'An error occurred during login: ' + error.message;
      });
  }
  

  navigateToSignup(): void {
    this.router.navigate(['/register']); //method pour passer a signup
  }
}
/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  handleLogin(event: Event): void {
    event.preventDefault();
  
    fetch('http://localhost:8084/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.username, password: this.password }),
    })
      .then(response => {
        const contentType = response.headers.get('Content-Type');
  
        if (response.ok) {
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          } else {
            throw new Error('Unexpected response format');
          }
        } else {
          throw new Error(`HTTP error ${response.status}`);
        }
      })
      .then(data => {
        console.log('Login response:', data); // Log pour voir la réponse
  
        const { userId, role } = data;
  
        if (userId && role) {
          const roleValue = role === 'ADMIN' ? 'ADMIN' : 'USER';
          this.authService.login(userId, roleValue);
          this.router.navigate(['/documents']);
        } else {
          throw new Error('Invalid response format: missing userId or role');
        }
      })
      .catch(error => {
        this.error = 'An error occurred during login: ' + error.message;
        console.error(error); // Log pour déboguer
      });
  }
  
  navigateToSignup(): void {
    this.router.navigate(['/register']);
  }
}*/
