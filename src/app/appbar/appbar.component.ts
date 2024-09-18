import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription;
  userRole: string | null = null;
  showMatiereForm: boolean = false;
  matiereNom: string = '';
  isMatiereListVisible: boolean = false;
  matieres: any[] = [];

  private readonly apiUrl = 'http://localhost:8084/matiere';

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    this.userRole = this.authService.getRole();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  handleLoginLogout(): void {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleMatiereForm(): void {
    this.showMatiereForm = !this.showMatiereForm;
  }
      addMatiere(): void {
        if (this.matiereNom.trim() === '') {
          alert('Le nom de la matière ne peut pas être vide.');
          return;
        }
      
        this.http.post<any>(this.apiUrl + '/add', { nom: this.matiereNom })
          .subscribe(response => {
            if (response.message === 'Matière existe déjà') {
              alert('Cette matière existe déjà.');
            } else {
              alert('Matière ajoutée avec succès.');
              this.matiereNom = '';
              this.showMatiereForm = false;
              this.loadMatieres(); // Recharge les matières après ajout
            }
          }, error => {
            if (error.status === 409) {
              alert('Cette matière existe déjà.');
            } else {
              alert('Erreur lors de l\'ajout de la matière.');
            }
          });
      }
      

  toggleMatiereList(): void {
    this.isMatiereListVisible = !this.isMatiereListVisible;
    if (this.isMatiereListVisible) {
      this.loadMatieres();
    }
  }

  loadMatieres(): void {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(data => {
        this.matieres = data;
      }, () => {
        alert('Erreur lors du chargement des matières.');
      });
  }

  deleteMatiere(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      this.http.delete(`${this.apiUrl}/${id}`)
        .subscribe(() => {
          this.matieres = this.matieres.filter(matiere => matiere.id !== id);
        }, () => {
          alert('Erreur lors de la suppression de la matière.');
        });
    }
  }
    navigateToMatiereDocuments(matiereId: number): void {
      this.router.navigate(['/documents', matiereId]); // Passe uniquement l'ID de la matière
    }
    
    navigateToHome(): void {
      this.router.navigate(['/home']);
  }
}




