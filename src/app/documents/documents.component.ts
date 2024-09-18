import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  pdfFiles: any[] = [];
  @ViewChild('fileInput') fileInputRef!: ElementRef;
  userRole: string | null = null;
  private matiereId: number | null = null;
  previewUrl: string | null = null;
  viewingFile: Blob | null = null;
  public fileType: string | null = null;

  private readonly apiUrl = 'http://localhost:8084/file';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

 /* ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.matiereId = Number(params.get('matiereId'));
      this.fileType = params.get('fileType');
      if (this.matiereId && this.fileType) {
        this.fetchFiles();
      }
    });
  }*/
    ngOnInit(): void {
      this.userRole = this.authService.getRole(); // Assurez-vous que cette méthode retourne le bon rôle
      this.route.paramMap.subscribe(params => {
        this.matiereId = Number(params.get('matiereId'));
        this.fileType = params.get('fileType');
        if (this.matiereId && this.fileType) {
          this.fetchFiles();
        }
      });
    }
    

  fetchFiles(): void {
    if (this.matiereId !== null && this.fileType) {
      this.http.get<any[]>(`${this.apiUrl}/matiere/${this.matiereId}/${this.fileType}`).subscribe(
        (response) => {
          console.log('Fetched files:', response);
          this.pdfFiles = response;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching files:', error);
          alert('Erreur lors de la récupération des fichiers. Veuillez réessayer.');
        }
      );
    }
  }

    handleFileUpload(event: Event, fileType: string): void {
      const input = event.target as HTMLInputElement;
      const files = input.files;
      if (files && this.matiereId !== null) {
        const formData = new FormData();
        Array.from(files).forEach((file: File) => {
          formData.append('files', file);
        });
        formData.append('type', fileType); // Changed from 'fileType' to 'type'
        formData.append('matiereId', this.matiereId.toString());
    
        this.http.post(`${this.apiUrl}/upload`, formData).subscribe(
          () => this.fetchFiles(),
          (error) => console.error('Error uploading file:', error)
        );
      }
    }
      
    
    

  handleDownload(id: number, name: string): void {
    this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading file:', error);
        alert('Erreur lors du téléchargement du fichier.');
      }
    );
  }

  handlePreview(id: number): void {
    this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error previewing file:', error);
        alert('Erreur lors de l\'aperçu du fichier.');
      }
    );
  }

  handleDelete(id: number): void {
    if (this.authService.isAdmin()) {
      const confirmDelete = window.confirm('Voulez-vous supprimer ce document ?');
      if (confirmDelete) {
        this.http.delete(`${this.apiUrl}/${id}`).subscribe(
          () => {
            this.fetchFiles();
            console.log('File deleted successfully');
          },
          (error) => {
            console.error('Error deleting file:', error);
            alert('Erreur lors de la suppression du fichier.');
          }
        );
      }
    } else {
      alert('Vous n\'êtes pas autorisé à supprimer des fichiers.');
    }
  }

  handleBack(): void {
    this.previewUrl = null;
    this.viewingFile = null;
  }

  handleImportClick(): void {
    if (this.authService.isAdmin()) {
      this.fileInputRef.nativeElement.click();
    } else {
      alert('Vous n\'êtes pas autorisé à importer des documents.');
    }
  }
}

