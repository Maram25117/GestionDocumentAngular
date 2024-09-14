import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private router: Router) { }

  logout() {
    // Supprimer les informations de l'utilisateur du localStorage
    localStorage.removeItem('currentUser');
    // Rediriger l'utilisateur vers la page de connexion
    this.router.navigate(['/login']);
  }
}

