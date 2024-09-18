import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {
  documents: any[] = [];
  private readonly apiUrl = 'http://localhost:8084/matiere';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const matiereId = this.route.snapshot.paramMap.get('id');
    if (matiereId) {
      this.loadDocuments(Number(matiereId));
    }
  }

  loadDocuments(matiereId: number): void {
    this.http.get<any[]>(`${this.apiUrl}/${matiereId}/documents`)
      .subscribe(data => {
        this.documents = data;
      }, () => {
        alert('Erreur lors du chargement des documents.');
      });
  }
}
/*on n'a pas besoin de ce fichier*/