import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private authSubscription!: Subscription;
  userRole: string | null = null;
  showMatiereForm: boolean = false;
  matiereNom: string = '';
  isMatiereListVisible: boolean = false;
  matieres: any[] = [];
  private readonly apiUrl = 'http://localhost:8084/matiere';
  constructor(private router: Router,
    private authService: AuthService,
    private http: HttpClient) { }

    ngOnInit(): void {
      console.log('Chargement des matières');
      this.loadMatieres(); // Charge la liste des matières à l'initialisation
    }
    
    loadMatieres(): void {
      this.http.get<any[]>(this.apiUrl)
        .subscribe(data => {
          this.matieres = data;
        }, () => {
          alert('Erreur lors du chargement des matières.');
        });
    }
    
    navigateToMatiereDocuments(matiereId: number): void {
      this.router.navigate(['/documents', matiereId]); // Redirige vers la page des documents de la matière
    }
  }    