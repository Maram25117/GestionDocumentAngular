import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatiereService } from '../matiere.service';  // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  matiereId: number | null = null;
  matiereName: string | null = null;
  fileType: string | null = null;
  files: any[] = [];

  private readonly apiUrl = 'http://localhost:8084/file';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private matiereService: MatiereService  // Injection du service
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.matiereId = Number(params.get('matiereId'));
      this.fileType = params.get('fileType');
      this.fetchMatiereName();
      this.fetchFiles();
    });
  }
  
  fetchMatiereName(): void {
    if (this.matiereId !== null) {
      this.matiereService.getMatiereById(this.matiereId).subscribe(
        (response) => {
          this.matiereName = response.nom;  // Utilisez 'nom' ici
        },
        (error) => {
          console.error('Error fetching matière name:', error);
        }
      );
    }
  }
  
  fetchFiles(): void {
    if (this.matiereId !== null && this.fileType) {
      this.http.get<any[]>(`${this.apiUrl}/${this.matiereId}/${this.fileType}`).subscribe(
        (response) => {
          this.files = response;
        },
        (error) => {
          console.error('Error fetching files:', error);
        }
      );
    }
  }
  
  navigateToFileType(fileType: string): void {
    if (this.matiereId !== null) {
      this.router.navigate(['/documents', this.matiereId, fileType]);
    }
  }
}
