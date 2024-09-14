/*import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents: any[] = [];
  isAdmin: boolean = false;

  private readonly apiUrl = 'http://localhost:8084/document';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Récupérer les informations de l'utilisateur depuis localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isAdmin = currentUser && currentUser.role === 'ADMIN';
    this.loadDocuments();
  }

  loadDocuments() {
    this.http.get<any[]>(`${this.apiUrl}/view`).subscribe(
      data => {
        this.documents = data;
      },
      error => {
        console.error('Error loading documents:', error);
        alert('Erreur lors du chargement des documents. Veuillez vérifier la console pour plus de détails.');
      }
    );
  }

  deleteDocument(id: number) {
    if (this.isAdmin && confirm('Are you sure you want to delete this document?')) {
      this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
        () => {
          this.loadDocuments();
        },
        error => {
          console.error('Error deleting document:', error);
          alert('Erreur lors de la suppression du document. Veuillez vérifier les détails.');
        }
      );
    } else if (!this.isAdmin) {
      alert('You do not have permission to delete documents.');
    }
  }

  uploadDocument(event: any) {
    if (this.isAdmin) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.http.post(`${this.apiUrl}/add`, formData).subscribe(
          () => {
            this.loadDocuments();
          },
          error => {
            console.error('Error uploading document:', error);
            alert('Erreur lors du téléversement du document. Veuillez vérifier les détails.');
          }
        );
      }
    } else {
      alert('You do not have permission to upload documents.');
    }
  }
}*/
/*import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'; // Un service qui gère l'authentification

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  pdfFiles: any[] = [];
  previewUrl: string | null = null;
  viewingFile: number | null = null;
  isAdmin: boolean = false; // Indique si l'utilisateur est un admin

  @ViewChild('fileInput') fileInputRef!: ElementRef;

  private readonly apiUrl = 'http://localhost:8084/document';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchFiles();
    this.checkAdminRole(); // Vérifiez si l'utilisateur est admin
  }

  checkAdminRole(): void {
    this.isAdmin = this.authService.isAdmin(); // Récupérer le rôle depuis AuthService
  }

  fetchFiles(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.pdfFiles = response;
      },
      (error) => {
        console.error('Error fetching files:', error);
        alert('Erreur lors de la récupération des fichiers. Veuillez réessayer.');
      }
    );
  }*/

  /*handleFileChange(event: Event): void {
    if (this.isAdmin) {
      const input = event.target as HTMLInputElement;
      const files = input.files;
      if (files) {
        const formData = new FormData();
        Array.from(files).forEach((file: File) => {
          formData.append('files', file);
        });

        this.http.post(`${this.apiUrl}/add`, formData, { responseType: 'text' }).subscribe(
          (response) => {
            console.log('Files uploaded successfully:', response);
            alert(response);
            this.fetchFiles();
          },
          (error) => {
            console.error('Error uploading files:', error);
            alert('Erreur lors du téléversement des fichiers.');
          }
        );
      }
    } else {
      alert('Vous n\'avez pas les droits pour ajouter des documents.');
    }
  }*/
    /*handleFileChange(event: Event): void {
      if (this.isAdmin) { // Seul l'admin peut téléverser des documents
        const input = event.target as HTMLInputElement;
        const files = input.files;
        if (files) {
          const formData = new FormData();
          Array.from(files).forEach((file: File) => {
            formData.append('files', file);
          });
  
          this.http.post(`${this.apiUrl}/add`, formData, { responseType: 'text' }).subscribe(
            (response) => {
              console.log('Files uploaded successfully:', response);
              alert(response);
              this.fetchFiles();
            },
            (error) => {
              console.error('Error uploading files:', error);
              alert('Erreur lors du téléversement des fichiers.');
            }
          );
        }
      } else {
        alert('Vous n\'avez pas les droits pour ajouter des documents.');
      }
    }
  

  handleDelete(id: number): void {
    if (this.isAdmin) {
      const confirmDelete = window.confirm('Voulez-vous supprimer ce document ?');
      if (confirmDelete) {
        this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
          () => {
            this.fetchFiles();
            if (this.viewingFile === id) {
              this.previewUrl = null;
              this.viewingFile = null;
            }
            console.log('File deleted successfully');
          },
          (error) => {
            console.error('Error deleting file:', error);
            alert('Erreur lors de la suppression du fichier.');
          }
        );
      }
    } else {
      alert('Vous n\'avez pas les droits pour supprimer des documents.');
    }
  }
}*/
/*import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  pdfFiles: any[] = [];
  previewUrl: string | null = null;
  viewingFile: number | null = null;
  @ViewChild('fileInput') fileInputRef!: ElementRef;

  private readonly apiUrl = 'http://localhost:8084/file';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFiles();
  }

  fetchFiles(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.pdfFiles = response;
      },
      (error) => {
        console.error('Error fetching files:', error);
        alert('Erreur lors de la récupération des fichiers. Veuillez réessayer.');
      }
    );
  }

    handleFileChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      const files = input.files;
      if (files) {
          const formData = new FormData();
          Array.from(files).forEach((file: File) => {
              formData.append('files', file);
          });
  
          this.http.post(`${this.apiUrl}/upload`, formData, { responseType: 'text' }).subscribe(
              (response) => {
                  console.log('Files uploaded successfully:', response);
                  alert(response); // Show the plain text message from the server
                  this.fetchFiles(); // Refresh file list after upload
              },
              (error) => {
                  console.error('Error uploading files:', error);
                  alert('Erreur lors du téléversement des fichiers. Veuillez vérifier les détails.');
              }
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
              document.body.removeChild(link); // Clean up link element
              window.URL.revokeObjectURL(url); // Clean up URL object
          },
          (error) => {
              console.error('Error downloading file:', error);
              alert('Erreur lors du téléchargement du fichier. Veuillez vérifier les détails.');
          }
      );
  }
  
    handlePreview(id: number): void {
      this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' }).subscribe(
        (response: Blob) => {
          const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
          window.open(url, '_blank'); // Open in a new tab
        },
        (error) => {
          console.error('Error previewing file:', error);
          alert('Erreur lors de l\'aperçu du fichier. Veuillez vérifier les détails.');
        }
      );
    }
     handleDelete(id: number): void {
    const confirmDelete = window.confirm('Voulez-vous supprimer ce document ?');
    if (confirmDelete) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(
        () => {
          this.fetchFiles(); // Refresh file list after deletion
          if (this.viewingFile === id) {
            this.previewUrl = null;
            this.viewingFile = null;
          }
          console.log('File deleted successfully');
        },
        (error) => {
          console.error('Error deleting file:', error);
          alert('Erreur lors de la suppression du fichier. Veuillez vérifier les détails.');
        }
      );
    }
  }

  handleBack(): void {
    this.previewUrl = null;
    this.viewingFile = null;
  }

  handleImportClick(): void {
    this.fileInputRef.nativeElement.click(); // Trigger the file input click event
  }
}*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'; // Import AuthService for role checking

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  pdfFiles: any[] = [];
  previewUrl: string | null = null;
  viewingFile: number | null = null;
  @ViewChild('fileInput') fileInputRef!: ElementRef;
  userRole: string | null = null; // Role of the user

  private readonly apiUrl = 'http://localhost:8084/file';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole(); // Retrieve user role
    console.log('User Role:', this.userRole); // Debugging line
    this.fetchFiles();
  }

  fetchFiles(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.pdfFiles = response;
      },
      (error) => {
        console.error('Error fetching files:', error);
        alert('Erreur lors de la récupération des fichiers. Veuillez réessayer.');
      }
    );
  }

  handleFileChange(event: Event): void {
    if (this.authService.isAdmin()) {
      const input = event.target as HTMLInputElement;
      const files = input.files;
      if (files) {
        const formData = new FormData();
        Array.from(files).forEach((file: File) => {
          formData.append('files', file);
        });

        const token = localStorage.getItem('authToken');
        if (!token) {
          alert('Token is missing. Please login again.');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`
        };

        this.http.post(`${this.apiUrl}/upload`, formData, { headers, responseType: 'text' }).subscribe(
          (response) => {
            console.log('Files uploaded successfully:', response);
            alert(response);
            this.fetchFiles();
          },
          (error) => {
            console.error('Error uploading files:', error);
            alert('Erreur lors du téléversement des fichiers.');
          }
        );
      }
    } else {
      alert('Vous n\'êtes pas autorisé à téléverser des fichiers.');
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
            if (this.viewingFile === id) {
              this.previewUrl = null;
              this.viewingFile = null;
            }
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
